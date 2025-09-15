// Ждем полной загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  // === ПЕРЕМЕННЫЕ ===
  const changeTextBtn = document.getElementById("changeTextBtn");
  const messageElement = document.getElementById("message");
  const nameInput = document.getElementById("nameInput");
  const greetBtn = document.getElementById("greetBtn");
  const greetingElement = document.getElementById("greeting");

  let clickCount = 0; // Счетчик для кнопки изменения текста
  let isCyan = false; // Состояние фона

  // === ФУНКЦИИ ===

  // Изменение текста кнопки
  function changeMessage() {
    clickCount++;
    const messages = [
      "Вы нажали кнопку!",
      "Еще разок!",
      "Отлично!",
      "Продолжайте в том же духе!",
      "JavaScript - это весело!",
    ];
    const messageIndex = (clickCount - 1) % messages.length;
    messageElement.textContent = messages[messageIndex];

    const colors = ["#ff5733", "#33ff57", "#3357ff", "#f333ff", "#ff33a1"];
    messageElement.style.color = colors[messageIndex];
  }

  // Приветствие пользователя
  function greetUser() {
    const name = nameInput.value.trim();
    if (name === "") {
      alert("Пожалуйста, введите ваше имя!");
      return;
    }
    greetingElement.innerHTML = `
      <h3>Привет, ${name}!</h3>
      <p>Добро пожаловать на мой первый сайт с JavaScript!</p>
      <p>Сегодня: ${new Date().toLocaleDateString()}</p>
    `;
    greetingElement.style.display = "block";
    nameInput.value = "";
  }

  // === ОБРАБОТЧИКИ СОБЫТИЙ ===

  // Кнопка изменения текста
  if (changeTextBtn) changeTextBtn.addEventListener("click", changeMessage);

  // Кнопка приветствия
  if (greetBtn) greetBtn.addEventListener("click", greetUser);

  // Нажатие Enter в поле ввода
  if (nameInput) {
    nameInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") greetUser();
    });
  }

  // Двойной клик на страницу для изменения фона

  // Анимация навигационных ссылок
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      () => (link.style.transform = "scale(1.1)")
    );
    link.addEventListener(
      "mouseleave",
      () => (link.style.transform = "scale(1)")
    );
  });

  // Анимация ссылок .link
  const links = document.querySelectorAll(".link");
  links.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      () => (link.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)")
    );
    link.addEventListener("mouseleave", () => (link.style.boxShadow = "none"));
  });

  // === РЕАКЦИИ НА МЕРОПРИЯТИЯ ===
  document.querySelectorAll("article").forEach((article) => {
    const reactions = article.querySelectorAll(".reaction");
    const articleTitle = article.querySelector("h3").innerText;

    // Получаем выбор пользователя
    let selected = localStorage.getItem(`selected_${articleTitle}`); // heart/fire/spark или null

    reactions.forEach((button) => {
      const type = button.dataset.type;
      const key = `${articleTitle}_${type}`;

      // Загружаем сохранённый счётчик
      let count = parseInt(localStorage.getItem(key)) || 0;
      button.querySelector("span").innerText = count;

      // Выделяем выбранную реакцию
      if (type === selected) button.classList.add("selected");

      button.addEventListener("click", () => {
        if (selected === type) return; // уже выбрана — ничего не делаем

        // Уменьшаем старую реакцию
        if (selected) {
          const oldBtn = article.querySelector(
            `.reaction[data-type="${selected}"]`
          );
          let oldCount = parseInt(oldBtn.querySelector("span").innerText);
          oldCount = Math.max(0, oldCount - 1);
          oldBtn.querySelector("span").innerText = oldCount;
          localStorage.setItem(`${articleTitle}_${selected}`, oldCount);
          oldBtn.classList.remove("selected");
        }

        // Увеличиваем новую реакцию
        count = parseInt(button.querySelector("span").innerText) + 1;
        button.querySelector("span").innerText = count;
        localStorage.setItem(key, count);

        // Сохраняем выбор пользователя
        selected = type;
        localStorage.setItem(`selected_${articleTitle}`, selected);

        // Подсветка выбранной реакции
        button.classList.add("selected");
      });
    });
  });
});
