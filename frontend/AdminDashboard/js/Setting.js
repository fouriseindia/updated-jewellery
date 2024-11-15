fetch('https://api.shankhjewels.com/admin/')
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          if (true) {
            document.getElementById('username').value = item.username;
            // document.getElementById('fullName').value = item.name;
            // document.getElementById('phoneNumber').value = item.phone;
          }
        });
      })
      .catch(err => console.error('Error fetching data:', err));
  

// Handle form submission for changing the password
document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
  
    const username = document.getElementById('username').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Ensure the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
  
    // Send the current password and new password to the backend
    fetch('https://api.shankhjewels.com/admin/update', {
      method: 'PUT', // Use the correct method
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        currentPassword: currentPassword,
        newPassword: newPassword
      })
    })
    .then(res => {
      // Check if the response is OK and is JSON
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json(); // Attempt to parse JSON
    })
    .then(data => {
      if (data.success) {
        alert('Password changed successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred: ' + err.message);
    });
  });
  