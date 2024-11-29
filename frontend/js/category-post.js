
        function logout() {
            // Clear user data from local storage
            localStorage.removeItem('userId');

            // Redirect to login page
            window.location.href = 'login_popup.html';
        }

   

        document.addEventListener('DOMContentLoaded', async () => {
            const api_uri = 'http://localhost:3000/api'; // Ensure this is the correct API base URL

            // Fetch the user ID from local storage
            const userId = localStorage.getItem('userId');

            if (userId) {
                try {
                    // Fetch the profile data using the user ID
                    const response = await fetch(`${api_uri}/profiles/${userId}`); // Correct endpoint
                    console.log(response);
                    if (response.ok) {
                        const profile = await response.json();
                        // Display the user's full name in place of "My Account"
                        document.getElementById('user-email').textContent = profile.fullName;
                    } else {
                        console.error('Failed to fetch profile:', await response.json());
                        document.getElementById('user-email').textContent = 'My Account';
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    document.getElementById('user-email').textContent = 'My Account';
                }
            } else {
                console.error('No user ID found in local storage');
                document.getElementById('user-email').textContent = 'My Account';
            }
        });

   
        // Function to add product to cart
        function addToCart(product) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert("Product added to cart!");
        }

        // Fetch products from the backend
        // 

        const apiUrl = 'http://localhost:3000/api';

       
        // Function to add product to cart
        function addToCart(product) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if the product already exists in the cart
            let existingProduct = cartItems.find(item => item._id === product._id);
            if (existingProduct) {
                alert('Product is already in the cart!');
            } else {
                cartItems.push(product);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert("Product added to cart!");
            }
        }


        // Function to handle Buy Now action
        function buyNow(productId, productPrice, productTitle) {
            // Get the specific quantity input for this product
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const quantity = Number(quantityInput.value);

            // Calculate the total price based on the quantity
            const totalPrice = productPrice * quantity;

            // Redirect to the checkout page with product id, total price, and product name
            window.location.href = `checkout.html?id=${productId}&price=${totalPrice}&name=${productTitle}`;
        }

        fetch('http://localhost:3000/api/products/all')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('product-list');
                products.forEach(product => {
                    const productCard = `
                <div class="col-md-3">
                    <div class="card" style="width: 18rem;">
                        <div class="card-img-container">
                            <img src="http://localhost:3000/${product.mainImage}" class="card-img-top" alt="${product.productTitle}">
                            <img src="http://localhost:3000/${product.thumbnailImages[0]}" class="card-img-hover" alt="${product.productTitle} Hover">
                            <div class="rating">
                                <img src="images/12.png" alt="Rating Icon"> 5.0
                            </div>
                            <button class="view-btn" onclick="window.location.href='detail.html?id=${product._id}'" 
                                style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: #b6d7f4; color: black; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                                View
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="pricing">
                                <span class="sale-price">₹${product.productPrice}</span>
                                <span class="regular-price"><del>₹${product.regularPrice}</del></span>
                            </div>
                            <p class="card-text">${product.productDescription}</p>
                            <div class="show-more-button">
                                <a href="javascript:void(0);" class="btn btn-primary" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</a>
                                <a href="checkout.html?id=${product._id}&price=${product.productPrice}&name=${product.productTitle}" class="btn btn-primary" style="margin-left: 10px;">Buy Product</a>
                            </div>
                        </div>
                    </div>
                </div>`;
                    productList.innerHTML += productCard;
                });
            })
            .catch(err => console.log('Error: ', err));

    