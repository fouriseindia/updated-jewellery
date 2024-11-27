// Fetch and display offers by category
async function fetchAndShowCategory(categoryId) {
    // Hide all categories
    document.querySelectorAll('.product-category').forEach(category => (category.style.display = 'none'));

    try {
        const response = await fetch(`https://api.shankhjewels.com/api/offers/${categoryId}`);
        const data = await response.json();

        if (response.ok) {
            populateCategoryTable(`${categoryId}Table`, data);
        } else {
            alert(`Error fetching products: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        alert('An error occurred. Please try again.');
    }

    // Show the selected category
    document.getElementById(categoryId).style.display = 'block';
}

// Submit a product for the selected category
async function submitProduct(event, formId, apiEndpoint, tableId) {
    event.preventDefault();

    const form = document.getElementById(formId);
    const formData = new FormData(form);

    try {
        const response = await fetch(`https://api.shankhjewels.com${apiEndpoint}`, {
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

// Populate a table with products
function populateCategoryTable(tableId, products) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        addProductToTable(tableId, product);
    });
}

// Add a product row to a table
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
        <td><button onclick="deleteOffer('${product._id}', '${tableId}')">Delete</button></td>
    `;
    tableBody.appendChild(row);
}

// Delete an offer
async function deleteOffer(offerId, tableId) {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
        const response = await fetch(`https://api.shankhjewels.com/api/offers/${offerId}`, {
            method: 'DELETE',
        });
        const data = await response.json();

        if (response.ok) {
            alert('Offer deleted successfully!');
            fetchAndShowCategory(tableId.replace('Table', '')); // Refresh the table
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error deleting offer:', error);
        alert('An error occurred. Please try again.');
    }
}

// Event listeners for form submissions
document.getElementById('discoverJewelleryForm').addEventListener('submit', event =>
    submitProduct(event, 'discoverJewelleryForm', '/api/offers/discover-jewellery', 'discoverJewelleryTable')
);

document.getElementById('shopByLookForm').addEventListener('submit', event =>
    submitProduct(event, 'shopByLookForm', '/api/offers/shop-by-look', 'shopByLookTable')
);
