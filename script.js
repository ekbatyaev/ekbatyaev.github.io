// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {

    // === ПЕРЕМЕННЫЕ ===
    // Получаем элементы со страницы по их ID
    const changeTextBtn = document.getElementById('changeTextBtn');
    const messageElement = document.getElementById('message');
    const nameInput = document.getElementById('nameInput');
    const greetBtn = document.getElementById('greetBtn');
    const greetingElement = document.getElementById('greeting');

    let clickCount = 0; // Переменная для подсчета кликов

    // === ФУНКЦИИ ===
    // Функция для изменения текста
    function changeMessage() {
        clickCount++; // Увеличиваем счетчик кликов

        // Массив с разными сообщениями
        const messages = [
            "Вы нажали кнопку!",
            "Еще разок!",
            "Отлично!",
            "Продолжайте в том же духе!",
            "JavaScript - это весело!"
        ];

        // Выбираем сообщение в зависимости от количества кликов
        const messageIndex = (clickCount - 1) % messages.length;
        messageElement.textContent = messages[messageIndex];

        // Меняем цвет текста случайным образом
        const colors = ['#ff5733', '#33ff57', '#3357ff', '#f333ff', '#ff33a1'];
        messageElement.style.color = colors[messageIndex];
    }

    // Функция для приветствия
    function greetUser() {
        const name = nameInput.value.trim();

        // Проверяем, введено ли имя
        if (name === '') {
            alert('Пожалуйста, введите ваше имя!');
            return;
        }

        // Создаем приветственное сообщение
        greetingElement.innerHTML = `
            <h3>Привет, ${name}!</h3>
            <p>Добро пожаловать на мой первый сайт с JavaScript!</p>
            <p>Сегодня: ${new Date().toLocaleDateString()}</p>
        `;

        // Показываем блок с приветствием
        greetingElement.style.display = 'block';

        // Очищаем поле ввода
        nameInput.value = '';
    }

    // === ОБРАБОТЧИКИ СОБЫТИЙ ===
    // При клике на первую кнопку вызываем функцию changeMessage
    changeTextBtn.addEventListener('click', changeMessage);

    // При клике на вторую кнопку вызываем функцию greetUser
    greetBtn.addEventListener('click', greetUser);

    // Также можно реагировать на нажатие Enter в поле ввода
    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            greetUser();
        }
    });

    // Дополнительная функция: меняем фон при двойном клике на странице
    document.addEventListener('dblclick', function() {
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === 'lightcyan' ?
                '#f0f0f0' : 'lightcyan';
    });
});