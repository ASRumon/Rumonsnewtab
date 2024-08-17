function createCalendar() {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const currentDate = now.getDate();

    const calendar = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = calendar.getDay();

    let calendarHtml = '<table>';
    calendarHtml += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

    for (let i = 0; i < startDay; i++) {
        calendarHtml += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((day + startDay - 1) % 7 === 0) {
            calendarHtml += '</tr><tr>';
        }
        if (day === currentDate) {
            calendarHtml += `<td class="current">${day}</td>`;
        } else {
            calendarHtml += `<td>${day}</td>`;
        }
    }

    calendarHtml += '</tr></table>';
    calendarElement.innerHTML = calendarHtml;
}

createCalendar();
