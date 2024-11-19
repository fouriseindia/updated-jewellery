// Function to show the selected category and fetch data
async function fetchAndShowCategory(categoryId) {
    // Hide all categories
    const categories = document.getElementsByClassName('product-category');
    for (let category of categories) {
        category.style.display = 'none';
    }

    // Fetch and display the selected category
    try {
        const response = await fetch(`https://api.shankhjewels.com/api/offers/${categoryId}`);
        const data = await response.json();

        if (response.ok) {
            populateCategoryTable(`${categoryId}Table`, data); // Correct data structure passed
        } else {
            alert(`Error fetching products: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        alert('An error occurred. Please try again.');
    }

    // Show the category container
    document.getElementById(categoryId).style.display = 'block';
}

// Function to handle product submission for categories
async function submitProduct(event, formId, apiEndpoint, tableId) {
    event.preventDefault();

    const form = document.getElementById(formId);
    const formData = new FormData(form);

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert('Product added successfully!');
            addProductToTable(tableId, data);
            form.reset();
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error(`Error adding product to ${formId}:`, error);
        alert('An error occurred. Please try again.');
    }
}




// Function to populate a category table with products
function populateCategoryTable(tableId, products) {
    const tableBody = document.getElementById(tableId);
    if (!tableBody) {
        console.error(`Table with ID ${tableId} not found.`);
        return;
    }
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        addProductToTable(tableId, product);
    });
}

// Update to render multiple images in the table
function addProductToTable(tableId, product) {
    const tableBody = document.getElementById(tableId);
    const row = document.createElement('tr');
    const imagesHTML = product.images
        .map(image => `<img src="https://api.shankhjewels.com/${image}" alt="${product.productName}" width="50">`)
        .join(' ');

    row.innerHTML = `
        <td>${product.productName}</td>
        <td>${product.discount}</td>
        <td>${imagesHTML}</td>
    `;
    tableBody.appendChild(row);
}
// Event listeners for form submissions
document.getElementById('discoverJewelleryForm').addEventListener('submit', event =>
    submitProduct(event, 'discoverJewelleryForm', 'https://api.shankhjewels.com/api/offers/discover-jewellery', 'discoverJewelleryTable')
);

document.getElementById('shopByLookForm').addEventListener('submit', event =>
    submitProduct(event, 'shopByLookForm', 'https://api.shankhjewels.com/api/offers/shop-by-look', 'shopByLookTable')
);
