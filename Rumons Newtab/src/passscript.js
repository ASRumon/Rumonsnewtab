document.addEventListener('DOMContentLoaded', function () {
    const correctPassword = "1"; // Set your password here
    const submitButton = document.getElementById('submitButton');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const protectedContent = document.getElementById('protectedContent');

    submitButton.addEventListener('click', function () {
        const userInput = passwordInput.value;

        if (userInput === correctPassword) {
            errorMessage.style.display = "none";
            protectedContent.style.display = "block";
        } else {
            errorMessage.style.display = "block";
            protectedContent.style.display = "none";
        }
    });
});
