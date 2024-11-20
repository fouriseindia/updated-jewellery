const verify = document.getElementById('toggleVerify');
const verifyBtn = document.getElementById('submit-btn');
const GenerateOTP = document.getElementById('GenerateOTP');
const otpInput = document.getElementById('otp');
const mobileInput = document.getElementById('mobile');

GenerateOTP.addEventListener('click', async function(e) {
    const mobileNumber = mobileInput.value;

    // Validate the mobile number using regex
    if (/^[6-9]\d{9}$/.test(mobileNumber)) {
        // Enable OTP field and make it visible
        otpInput.disabled = false;
        document.getElementById('otpfield').style.display = 'block';

        try {
            // Send mobile number to server
            const response = await fetch('http://localhost:3000/api/otp/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber: mobileNumber }) // Send mobile number as JSON
            });

            const result = await response.json(); // Parse the response

            if (response.ok && result.success) {
                // Update UI to indicate OTP generation success
                GenerateOTP.innerText = 'OTP Generated';
            } else if (!result.success && result.message === 'Mobile number already registered') {
                // Handle the case when mobile number already exists
                alert('This mobile number is already registered. Please log in or use a different number.');
            } else {
                // Handle any other server-side error response
                alert('Mobile number already registered. Please verify or use another number');
            }
        } catch (error) {
            console.error('Error generating OTP:', error);
            alert('Something went wrong. Please try again later.');
        }
    } else {
        alert('Please enter a valid mobile number.');
    }
});

verify.addEventListener('click', async function() {
    const mobileNumber = mobileInput.value;
    const otp = otpInput.value;  // Directly reference the OTP input field value
    try {
        const response = await fetch('http://localhost:3000/api/otp/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: mobileNumber, otp: otp }) // Send mobile number and OTP as JSON
        });

        const result = await response.json(); // Parse the response

        if (response.ok && result.success) {
            // OTP verified, proceed with registration or next steps
            verify.innerText = "Verified";
            alert("OTP Verified successfully!");

            // Proceed to the next step (e.g., redirect or allow further form submission)
            // Example: Redirecting to signup page
            window.location.href = 'register.html';
        } else {
            alert('please Enter Valid Otp');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Something went wrong. Please try again later.');
    }
});
verifyBtn.addEventListener('click', async function() {
    const mobileNumber = mobileInput.value;
    const otp = otpInput.value;  // Directly reference the OTP input field value

    try {
        const response = await fetch('http://localhost:3000/api/otp/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: mobileNumber, otp: otp }) // Send mobile number and OTP as JSON
        });

        const result = await response.json(); // Parse the response

        if (response.ok && result.success) {
            // OTP verified, proceed with registration or next steps
            verify.innerText = "Verified";
            alert("OTP Verified successfully!");

            // Proceed to the next step (e.g., redirect or allow further form submission)
            // Example: Redirecting to signup page
            window.location.href = 'register.html';
        } else {
            alert('please Enter Valid Otp');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Something went wrong. Please try again later.');
    }
});
