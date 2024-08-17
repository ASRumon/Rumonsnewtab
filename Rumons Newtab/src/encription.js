document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('encryptBtn').addEventListener('click', encrypt);
    document.getElementById('decryptBtn').addEventListener('click', decrypt);
});

function encrypt() {
    var plaintext = document.getElementById('plaintext').value;
    var password = document.getElementById('password').value;

    if (plaintext === '' || password === '') {
        alert('Please enter text and password.');
        return;
    }

    var encryptedText = CryptoJS.AES.encrypt(plaintext, password).toString();
    document.getElementById('result').value = encryptedText;
}

function decrypt() {
    var encryptedText = document.getElementById('plaintext').value.trim(); // Trim to remove any leading/trailing whitespace
    var password = document.getElementById('password').value.trim(); // Trim to remove any leading/trailing whitespace

    if (encryptedText === '' || password === '') {
        alert('Please enter encrypted text and password.');
        return;
    }

    try {
        var bytes = CryptoJS.AES.decrypt(encryptedText, password);
        var decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedText) {
            document.getElementById('result').value = decryptedText;
        } else {
            alert('Decryption failed. Incorrect password or invalid encrypted text.');
        }
    } catch (error) {
        alert('Decryption failed. Please check your password.');
    }
}
