document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('Password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMsg = document.getElementById('passwordMsg');
    const ageCheck = document.getElementById('ageCheck');
    const ageMsg = document.getElementById('ageMsg');
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('signupForm');

    // Function to validate passwords and checkbox
    function validateForm() {
        const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        const isAgeChecked = ageCheck.checked;

        // Password validation
        if (confirmPasswordInput.value.length > 0) {
            if (passwordsMatch) {
                passwordMsg.textContent = 'Passwords match';
                passwordMsg.style.color = 'green';
            } else {
                passwordMsg.textContent = 'Passwords do not match';
                passwordMsg.style.color = 'red';
            }
        } else {
            passwordMsg.textContent = '';
        }

        // Age checkbox validation
        if (!isAgeChecked) {
            ageMsg.textContent = 'You must be over 18 to sign up';
            ageMsg.style.color = 'red';
        } else {
            ageMsg.textContent = '';
        }

        // Enable submit button only if passwords match and age is checked
        submitBtn.disabled = !(passwordsMatch && isAgeChecked);
    }

    // Real-time validation on input and checkbox change
    passwordInput.addEventListener('input', validateForm);
    confirmPasswordInput.addEventListener('input', validateForm);
    ageCheck.addEventListener('change', validateForm);

    // Prevent form submission if validation fails
    form.addEventListener('submit', (e) => {
        if (!ageCheck.checked || passwordInput.value !== confirmPasswordInput.value) {
            e.preventDefault();
            validateForm();
        }
    });
});