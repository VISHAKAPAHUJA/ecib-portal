document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('error-message');

    // Check if elements exist
    if (!loginForm || !errorElement) {
        console.error("Critical elements not found!");
        return;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Clear previous error messages
        errorElement.textContent = '';
        
        console.log("Attempting login with:", username, password);
        
        // Validate credentials
        if (username === 'alishan@ubl.com.pk' && password === '12345') {
            console.log("Login successful - redirecting...");
            try {
                // Try relative path first
                window.location.href = 'index.html';
                
                // Fallback after short delay
                setTimeout(() => {
                    if (window.location.pathname.indexOf('login.html') > -1) {
                        console.log("Fallback redirect triggered");
                        window.location.assign('index.html');
                    }
                }, 100);
            } catch (e) {
                console.error("Redirect error:", e);
                errorElement.textContent = 'Redirect failed. Please try again.';
            }
        } else {
            console.log("Invalid credentials");
            errorElement.textContent = 'Invalid username or password';
            document.getElementById('password').value = '';
        }
    });
});