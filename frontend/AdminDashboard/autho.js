 // Check if the user is authenticated
 if (!sessionStorage.getItem('authenticated')) {
    window.location.href = 'login.html';
}
