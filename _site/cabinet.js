document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Отображаем информацию о пользователе
    const userData = document.getElementById('userData');
    userData.innerHTML = `
        <p><strong>Имя:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
    `;
    
    // Загружаем записи пользователя
    loadAppointments(currentUser.email);
    
    // Кнопка новой записи
    const newAppointmentBtn = document.getElementById('newAppointmentBtn');
    if (newAppointmentBtn) {
        newAppointmentBtn.addEventListener('click', function() {
            window.location.href = 'index.html#price';
        });
    }
});

function loadAppointments(userEmail) {
    const users = JSON.parse(localStorage.getItem('beautyLifeUsers'));
    const user = users.find(u => u.email === userEmail);
    const appointmentsList = document.getElementById('appointmentsList');
    
    if (!user || user.appointments.length === 0) {
        appointmentsList.innerHTML = '<p>У вас пока нет записей</p>';
        return;
    }
    
    let html = '<div class="appointments-table">';
    user.appointments.forEach((app, index) => {
        html += `
            <div class="appointment-row">
                <div class="appointment-service">${app.service}</div>
                <div class="appointment-date">${app.date}</div>
                <div class="appointment-price">${app.price} руб.</div>
                <button class="cancel-btn" data-index="${index}">Отменить</button>
            </div>
        `;
    });
    html += '</div>';
    
    appointmentsList.innerHTML = html;
    
    // Добавляем обработчики для кнопок отмены
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cancelAppointment(userEmail, index);
        });
    });
}

function cancelAppointment(userEmail, index) {
    if (!confirm('Вы уверены, что хотите отменить эту запись?')) return;
    
    const users = JSON.parse(localStorage.getItem('beautyLifeUsers'));
    const userIndex = users.findIndex(u => u.email === userEmail);
    
    if (userIndex !== -1) {
        users[userIndex].appointments.splice(index, 1);
        localStorage.setItem('beautyLifeUsers', JSON.stringify(users));
        
        // Обновляем текущего пользователя
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.email === userEmail) {
            currentUser.appointments = users[userIndex].appointments;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        loadAppointments(userEmail);
        alert('Запись успешно отменена');
    }
}