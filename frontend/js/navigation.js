
        function logout() {
            // Clear user data from local storage
           sessionStorage.removeItem('userdata');

            // Redirect to login page
            window.location.href = 'login.html';
        }


        document.addEventListener('DOMContentLoaded', async () => {
            const api_uri = 'https://api.shankhjewels.com/api'; // Ensure this is the correct API base URL

            // Fetch the user ID from local storage
            const userId = localStorage.getItem('userId');

            if (userId) {
                try {
                    
                    // Fetch the profile data using the user ID
                    const response = await fetch(`${api_uri}/users/${userId}`); // Correct endpoint
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
                document.getElementById('user-email').textContent = sessionStorage.getItem("userdata") || "Profile";
                document.getElementById('logout').style.display='none';
                if(sessionStorage.getItem('userdata')){
                     document.getElementById('login').style.display = 'none';
                     document.getElementById('logout').style.display='block';
                }
                
            }
        });

   