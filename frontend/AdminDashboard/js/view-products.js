function openTab(evt, tabName) {
    var i, tabContent, tabButton;
    
    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    
    // Remove the "active" class from all buttons
    tabButton = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].classList.remove("active");
    }
    
    // Show the current tab and set the button to active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Display the first tab by default
document.addEventListener('DOMContentLoaded', function() {
    openTab(event, 'exclusiveDiscount'); // Use the function to show the default tab
});

// Display the first tab by default
document.getElementById("exclusiveDiscount").style.display = "block";

function showCategory(categoryId) {
    // Hide all categories
    const categories = document.getElementsByClassName('product-category');
    for (let i = 0; i < categories.length; i++) {
        categories[i].style.display = 'none';
    }

    // Show selected category
    document.getElementById(categoryId).style.display = 'block';
}

// Load products for each category
document.addEventListener('DOMContentLoaded', function() {
    loadProducts('exclusiveDiscountTable', exclusiveDiscountProducts);
    loadProducts('discoverJewelleryTable', discoverJewelleryProducts);
    loadProducts('shopByLookTable', shopByLookProducts);
});

const exclusiveDiscountProducts = [
    { name: 'Gold Necklace', discount: '15%', price: '$200', image: 'https://via.placeholder.com/50' },
    { name: 'Diamond Ring', discount: '20%', price: '$300', image: 'https://via.placeholder.com/50' }
];

const discoverJewelleryProducts = [
    { name: 'Silver Bracelet', discount: '10%', image: 'https://via.placeholder.com/50' },
    { name: 'Pearl Earrings', discount: '25%', image: 'https://via.placeholder.com/50' }
];

const shopByLookProducts = [
    { name: 'Wedding Set', discount: '30%', image: 'https://via.placeholder.com/50' },
    { name: 'Traditional Necklace', discount: '18%', image: 'https://via.placeholder.com/50' }
];

function loadProducts(tableId, products) {
    const tableBody = document.getElementById(tableId);
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.discount}</td>
            ${product.price ? `<td>${product.price}</td>` : ''}
            <td><img src="${product.image}" alt="${product.name}"></td>
        `;
        tableBody.appendChild(row);
    });
}


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
        fetch('http://localhost:3000/api/offers/exclusive-discount', {
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
        const response = await fetch('http://localhost:3000/api/offers/discover-jewellery', {
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
        const response = await fetch('http://localhost:3000/api/offers/shop-by-look', {
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