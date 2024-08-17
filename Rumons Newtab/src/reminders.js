const reminderForm = document.getElementById('reminder-form');
const reminderList = document.getElementById('reminder-list');

reminderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const reminderText = document.getElementById('reminder-text').value;
    const reminderNote = document.getElementById('reminder-note').value;
    const reminderDatetime = document.getElementById('reminder-datetime').value;

    if (reminderText && reminderDatetime) {
        const reminderTime = new Date(reminderDatetime);
        const now = new Date();
        const timeLeft = Math.max(reminderTime - now, 0);
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        const reminderRow = document.createElement('tr');
        reminderRow.innerHTML = `
            <td>${reminderText}</td>
            <td>${reminderNote}</td>
            <td class="remaining-time">in ${hoursLeft}h ${minutesLeft}m</td>
            <td class="real-time">${new Date(reminderDatetime).toLocaleString()}</td>
            <td><button class="delete-button">&times;</button></td>
        `;

        reminderList.appendChild(reminderRow);
        saveReminder(reminderText, reminderNote, reminderDatetime);

        const deleteButton = reminderRow.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            reminderList.removeChild(reminderRow);
            deleteReminder(reminderText, reminderDatetime);
        });
    }

    reminderForm.reset();
});

function saveReminder(text, note, datetime) {
    chrome.storage.sync.get(['reminders'], (result) => {
        const reminders = result.reminders || [];
        reminders.push({ text, note, datetime });
        chrome.storage.sync.set({ reminders });
    });
}

function loadReminders() {
    chrome.storage.sync.get(['reminders'], (result) => {
        const reminders = result.reminders || [];
        reminders.forEach((reminder) => {
            const reminderTime = new Date(reminder.datetime);
            const now = new Date();
            const timeLeft = Math.max(reminderTime - now, 0);
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            const reminderRow = document.createElement('tr');
            reminderRow.innerHTML = `
                <td>${reminder.text}</td>
                <td>${reminder.note}</td>
                <td class="remaining-time">in ${hoursLeft}h ${minutesLeft}m</td>
                <td class="real-time">${new Date(reminder.datetime).toLocaleString()}</td>
                <td><button class="delete-button">&times;</button></td>
            `;

            reminderList.appendChild(reminderRow);

            const deleteButton = reminderRow.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                reminderList.removeChild(reminderRow);
                deleteReminder(reminder.text, reminder.datetime);
            });
        });
    });
}

function deleteReminder(text, datetime) {
    chrome.storage.sync.get(['reminders'], (result) => {
        const reminders = result.reminders || [];
        const updatedReminders = reminders.filter(reminder => reminder.text !== text || reminder.datetime !== datetime);
        chrome.storage.sync.set({ reminders: updatedReminders });
    });
}

function updateRemainingTimes() {
    const rows = document.querySelectorAll('#reminder-list tr');
    rows.forEach(row => {
        const reminderTime = new Date(row.querySelector('.real-time').textContent);
        const now = new Date();
        const timeLeft = Math.max(reminderTime - now, 0);
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        row.querySelector('.remaining-time').textContent = `in ${hoursLeft}h ${minutesLeft}m`;
    });
}

loadReminders();
setInterval(updateRemainingTimes, 60000); // Update every minute
