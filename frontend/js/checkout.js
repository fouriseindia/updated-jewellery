function fetchDataFromUrl() {
    // Get the current URL
    const url = window.location.href;
    
    // Use URLSearchParams to parse the query parameters
    const urlParams = new URLSearchParams(new URL(url).search);

    // Extract all occurrences of each parameter as arrays
    const ids = urlParams.getAll('id');
    const prices = urlParams.getAll('price').map(Number); // Convert prices to numbers
    const names = urlParams.getAll('name');
    const descriptions = urlParams.getAll('des');

    // Build the products array dynamically
    const products = [];
    for (let i = 0; i < ids.length; i++) {
        products.push({
            id: ids[i],
            name: names[i],
            description: descriptions[i],
            price: prices[i]
        });
    }

    return products;
}

// Example usage:
const products = fetchDataFromUrl();
console.log(products); // Logs array of product objects

const productListElement = document.getElementById("product-list");

// Function to render products
function renderProducts() {
    // Clear any existing items in the list to avoid duplicates
    productListElement.innerHTML = "";

    let subtotal = 0;

    products.forEach(product => {
        // Create list item for each product
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between lh-sm";

        listItem.innerHTML = `
            <div>
                <h6 class="my-0">${product.name}</h6>
                <small class="text-muted">${product.description}</small>
            </div>
            <span class="text-muted">₹${product.price.toFixed(2)}</span>
        `;

        productListElement.appendChild(listItem);
        subtotal += product.price;
    });

    // Subtotal element
    const subtotalItem = document.createElement("li");
    subtotalItem.className = "list-group-item d-flex justify-content-between";
    subtotalItem.innerHTML = `
        <span>Subtotal</span>
        <strong>₹${subtotal.toFixed(2)}</strong>
    `;
    productListElement.appendChild(subtotalItem);

    // Grand total element (adjust if you have taxes or shipping)
    const grandTotal = subtotal; // Modify this calculation if needed

    const grandTotalItem = document.createElement("li");
    grandTotalItem.className = "list-group-item d-flex justify-content-between";
    grandTotalItem.innerHTML = `
        <span>Grand Total</span>
        <strong>₹${grandTotal.toFixed(2)}</strong>
    `;
    productListElement.appendChild(grandTotalItem);
}

// Render the product list on page load
renderProducts();


// Api POST 
document.getElementById("checkoutForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission
    
    // Capture the form data from the form inputs
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        address2: document.getElementById("address2").value,
        locality: document.getElementById("locality").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        phone: document.getElementById("phone").value,
        email: sessionStorage.getItem('loggedInEmail'),
        alternateAddress: document.getElementById("alternateAddress").value,
        addressType: document.querySelector('input[name="addressType"]:checked').value
    };

    // Loop through each product and create a separate checkout for each one
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Create a new checkout object for each product
        const productCheckoutData = {
            ...formData,  // Spread the original form data
            productname: product.name,
            productquantity: 1,  // Default to 1 quantity or adjust as needed
            productprice: product.price
        };

        try {
            // Send a POST request to the server for each product
            const response = await fetch("http://localhost:3000/api/checkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productCheckoutData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Successfully saved message
                alert(`Order for ${product.name} placed successfully!`);
                setTimeout(function() {
                    location.reload();  // This will reload the page after 1 second
                }, 1000);
            } else {
                const error = await response.json();
                console.error("Error:", error.message);
                alert(`There was an error placing the order for ${product.name}.`);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert(`Network error. Please try again for ${product.name}.`);
        }
    }
});
