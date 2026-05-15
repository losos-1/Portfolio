window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 1600);
  });
//header
const switchTopic = document.querySelector("#switchTopic");

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.dataset.theme = savedTheme;

switchTopic.addEventListener("click", (event) => {
  const button = event.target.closest(".topic_part");

  if (!button) return;

  // переключаем только если нажали на активную кнопку
  if (!button.classList.contains("topic--white")) return;

  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";

  const topicBlack = switchTopic.querySelector(".topic--black");
  const topicWhite = switchTopic.querySelector(".topic--white");

  if (!topicBlack || !topicWhite) return;

  if (isDark) {
    html.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  } else {
    html.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }

  topicWhite.classList.remove("topic--white");
  topicWhite.classList.add("topic--black");

  topicBlack.classList.remove("topic--black");
  topicBlack.classList.add("topic--white");
});