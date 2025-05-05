// Инициализация хранилища
if (!localStorage.getItem('beautyLifeUsers')) {
    localStorage.setItem('beautyLifeUsers', JSON.stringify([]));
}

// Проверка авторизации
document.addEventListener('DOMContentLoaded', function() {
    // Переключение между вкладками
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Убираем активный класс у всех кнопок и контента
                document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Добавляем активный класс текущей кнопке и контенту
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const users = JSON.parse(localStorage.getItem('beautyLifeUsers'));
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email
                }));
                window.location.href = 'cabinet.html';
            } else {
                alert('Неверный email или пароль');
            }
        });
    }

    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            
            if (password !== confirm) {
                alert('Пароли не совпадают');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('beautyLifeUsers'));
            
            // Проверка на существующего пользователя
            if (users.some(u => u.email === email)) {
                alert('Пользователь с таким email уже зарегистрирован');
                return;
            }
            
            const newUser = {
                name: name,
                email: email,
                password: password,
                appointments: []
            };
            
            users.push(newUser);
            localStorage.setItem('beautyLifeUsers', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({
                name: name,
                email: email
            }));
            
            alert('Регистрация успешна!');
            window.location.href = 'cabinet.html';
        });
    }

    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});
