document.addEventListener('DOMContentLoaded', function () {
    const passwordLengthInput = document.getElementById('password-length');
    const includeUppercaseInput = document.getElementById('include-uppercase');
    const includeLowercaseInput = document.getElementById('include-lowercase');
    const includeNumbersInput = document.getElementById('include-numbers');
    const includeSymbolsInput = document.getElementById('include-symbols');
    const generatePasswordButton = document.getElementById('generate-password');
    const generatedPasswordInput = document.getElementById('generated-password');
    const passwordLabelInput = document.getElementById('password-label');
    const savePasswordButton = document.getElementById('save-password');

    generatePasswordButton.addEventListener('click', generatePassword);
    savePasswordButton.addEventListener('click', savePassword);
// Function to display saved passwords
function displaySavedPasswords() {
    const passwordList = document.getElementById('password-list');
    passwordList.innerHTML = '';
    chrome.storage.local.get({ passwords: [] }, function(data) {
      const passwords = data.passwords;
      passwords.forEach(function(entry, index) {
        const row = document.createElement('tr');
        row.className = 'password-item';
  
        const labelCell = document.createElement('td');
        labelCell.textContent = entry.label;
        row.appendChild(labelCell);
  
        const passwordCell = document.createElement('td');
        passwordCell.textContent = entry.password;
        row.appendChild(passwordCell);
  
        const optionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
          deletePassword(index);
        };
        optionsCell.appendChild(deleteButton);
  
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.onclick = function() {
          copyToClipboard(entry.password);
        };
        optionsCell.appendChild(copyButton);
  
        row.appendChild(optionsCell);
  
        passwordList.appendChild(row);
      });
    });
  }
    function generatePassword() {
        const length = parseInt(passwordLengthInput.value);
        const includeUppercase = includeUppercaseInput.checked;
        const includeLowercase = includeLowercaseInput.checked;
        const includeNumbers = includeNumbersInput.checked;
        const includeSymbols = includeSymbolsInput.checked;

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()-_=+[{]}|;:,<.>/?';

        let chars = '';
        if (includeUppercase) chars += uppercaseChars;
        if (includeLowercase) chars += lowercaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        generatedPasswordInput.value = password;
    }

    function savePassword() {
        const password = generatedPasswordInput.value.trim();
        const label = passwordLabelInput.value.trim();
        if (password) {
            const entry = {
                password: password,
                label: label || 'Unnamed Password'
            };
            chrome.storage.local.get({ passwords: [] }, function (data) {
                const passwords = data.passwords;
                passwords.push(entry);
                chrome.storage.local.set({ passwords: passwords }, function () {
                    // alert('Password saved successfully!');
                    displaySavedPasswords();
                });
            });
        } else {
            alert('Please generate a password before saving.');
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
  
    // Function to display saved passwords
    function displaySavedPasswords() {
        const passwordList = document.getElementById('password-list');
        passwordList.innerHTML = '';
        chrome.storage.local.get({ passwords: [] }, function(data) {
          const passwords = data.passwords;
          passwords.forEach(function(entry, index) {
            const row = document.createElement('tr');
            row.className = 'password-item';
      
            const labelCell = document.createElement('td');
            labelCell.textContent = entry.label;
            row.appendChild(labelCell);
      
            const passwordCell = document.createElement('td');
            passwordCell.textContent = entry.password;
            row.appendChild(passwordCell);
      
            const optionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
              deletePassword(index);
            };
            optionsCell.appendChild(deleteButton);
      
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.onclick = function() {
              copyToClipboard(entry.password);
            };
            optionsCell.appendChild(copyButton);
      
            row.appendChild(optionsCell);
      
            passwordList.appendChild(row);
          });
        });
      }
      
  
    // Function to delete a password
    function deletePassword(index) {
      chrome.storage.local.get({ passwords: [] }, function(data) {
        const passwords = data.passwords;
        passwords.splice(index, 1);
        chrome.storage.local.set({ passwords: passwords }, function() {
          displaySavedPasswords();
        });
      });
    }
  
    // Function to copy text to clipboard
    function copyToClipboard(text) {
      const input = document.createElement('input');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('Copied to clipboard!');
    }
  
    // Call displaySavedPasswords to initially display saved passwords
    displaySavedPasswords();
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    const copyPasswordButton = document.getElementById('copy-password');
    const generatedPasswordInput = document.getElementById('generated-password');

    copyPasswordButton.addEventListener('click', function() {
      copyToClipboard(generatedPasswordInput.value);
    });

    function copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Password copied to clipboard!');
    }
  });

