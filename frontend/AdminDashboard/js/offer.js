function openTab(evt, tabName) {
    var i, tabContent, tabButton;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabButton = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Display the first tab by default
document.getElementById("exclusiveDiscount").style.display = "block";

// Load products for each category



async function submitExclusiveDiscount() {
    const productName = document.getElementById('productName').value.trim();
    const startingPrice = document.getElementById('startingPrice').value.trim();
    const discount = document.getElementById('discount').value.trim();

    // Check if any field is empty
    if (!productName || !startingPrice || !discount) {
        alert("All fields are required.");
        return;
    }

    // Prepare the data to send
    const data = {
        productName: productName,
        startingPrice: parseFloat(startingPrice),
        discount: parseFloat(discount),
    };

    console.log('Submitting data:', data); // Debugging line

    // Send data to the server using fetch
    fetch('https://api.shankhjewels.com/api/offers/exclusive-discount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message) {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add exclusive discount.');
    });
}

async function submitDiscoverJewellery() {
const form = document.getElementById('discoverJewelleryForm');
const formData = new FormData(form);

try {
    const response = await fetch('https://api.shankhjewels.com/api/offers/discover-jewellery', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        form.reset(); // Clear the form after submission
    } else {
        alert('Error: ' + data.message);
    }
} catch (error) {
    console.error('Error submitting discover jewellery:', error);
    alert('An error occurred. Please try again.');
}
}

async function submitShopByLook() {
const form = document.getElementById('shopByLookForm');
const formData = new FormData(form);

try {
    const response = await fetch('https://api.shankhjewels.com/api/offers/shop-by-look', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        form.reset(); // Clear the form after submission
    } else {
        alert('Error: ' + data.message);
    }
} catch (error) {
    console.error('Error submitting shop by look:', error);
    alert('An error occurred. Please try again.');
}
}


// Function to show product categories
function showCategory(category) {
    const categories = document.querySelectorAll('.product-category');

    // Hide all categories
    categories.forEach(cat => {
        cat.style.display = 'none';
    });

    // Show selected category
    document.getElementById(category).style.display = 'block';

    // Fetch data for the selected category
    fetchProductsByCategory(category);
}

// Function to fetch products based on the selected category
// Function to fetch products based on the selected category
async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://api.shankhjewels.com/api/offers/discoverJewellery`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Read the response body as JSON
        const products = await response.json();
        updateProductTable(category, products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}


// Function to update the product table with fetched data
function updateProductTable(category, products) {
    let tableBody;
    switch (category) {
        case 'discoverJewelleryProducts':
            tableBody = document.getElementById('discoverJewelleryTable');
            break;
        case 'shopByLookProducts':
            tableBody = document.getElementById('shopByLookTable');
            break;
        default:
            return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Populate table with fetched data
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.discount}</td>
            <td>${product.startingPrice || '-'}</td>
            <td><img src="${product.imageUrl}" alt="${product.productName}" width="50" /></td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize default view on page load
document.addEventListener('DOMContentLoaded', () => {
    showCategory('exclusiveDiscountProducts'); // Show the default category on load
});
