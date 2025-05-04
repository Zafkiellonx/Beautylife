document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-button');
    
    if (currentUser) {
        if (currentUser.email === 'admin@beautylife.ru') {
            loginBtn.innerHTML = '<i class="fas fa-user-shield"></i> Админ';
        } else {
            loginBtn.innerHTML = '<i class="fas fa-user"></i> Кабинет';
        }
        loginBtn.href = currentUser.email === 'admin@beautylife.ru' ? 'admin.html' : 'cabinet.html';
    } else {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Войти';
        loginBtn.href = 'login.html';
    }
    
    // Запись на услугу
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                if (confirm('Для записи необходимо войти. Перейти на страницу входа?')) {
                    window.location.href = 'login.html';
                }
                return;
            }
            
            const serviceRow = this.closest('.price-row');
            const serviceName = serviceRow.querySelector('.price-service').textContent;
            const servicePrice = serviceRow.querySelector('.price-cost').textContent;
            
            const date = prompt('Введите дату и время записи (например, 15.05.2023 14:00):');
            if (!date) return;
            
            const users = JSON.parse(localStorage.getItem('beautyLifeUsers')) || [];
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            
            if (userIndex !== -1) {
                if (!users[userIndex].appointments) {
                    users[userIndex].appointments = [];
                }
                
                users[userIndex].appointments.push({
                    service: serviceName,
                    price: servicePrice,
                    date: date,
                    status: 'Новый'
                });
                
                localStorage.setItem('beautyLifeUsers', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
                
                alert(`Вы записаны на "${serviceName}" на ${date}. Стоимость: ${servicePrice}.`);
                
                if (confirm('Перейти в личный кабинет?')) {
                    window.location.href = 'cabinet.html';
                }
            }
        });
    });
});