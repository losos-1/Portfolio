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


const mobileMenuBtn = document.querySelector("#headerMobileMenu")
const mobileMenu = document.querySelector("#mobileMenu")
const closeMenuBtn = document.querySelector("#closeMenuBtn")
const mobileLinks = document.querySelectorAll(".mobile_link");

mobileMenuBtn.addEventListener("click",() =>{
  mobileMenu.classList.remove("display_none")
})
closeMenuBtn.addEventListener("click",()=>{
  mobileMenu.classList.add("display_none")
})
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("display_none");
  });
});
//slider

const slides = document.querySelectorAll(".slider_item");
const nextButton = document.querySelector(".next_slide--right");
const prevButton = document.querySelector(".next_slide--left");
const sliderBox = document.querySelector(".slider_box")
const sliderTimer = document.querySelector(".slider_timer__line")

let timerCnt = 0;
let timerSlider
let currentSlide = 0;



function updateSlider() {
  clearInterval(timerSlider)

    slides.forEach((slide) => {
        slide.classList.remove(
            "slider_item--active",
            "slider_item--left",
            "slider_item--right",
            "slider_item--hidden"
        );

        slide.classList.add("slider_item--hidden");
    });

    const rightSlide = currentSlide === 0 
        ? slides.length - 1 
        : currentSlide - 1;

    const leftSlide = currentSlide === slides.length - 1 
        ? 0 
        : currentSlide + 1;

    slides[currentSlide].classList.remove("slider_item--hidden");
    slides[currentSlide].classList.add("slider_item--active");

    slides[leftSlide].classList.remove("slider_item--hidden");
    slides[leftSlide].classList.add("slider_item--left");

    slides[rightSlide].classList.remove("slider_item--hidden");
    slides[rightSlide].classList.add("slider_item--right");
    timerSlider = setInterval(()=>{
      timerCnt += 1
      if (timerCnt === 100){
        timerCnt = 0
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = slides.length - 1;
        }
        updateSlider();
      }
      sliderTimer.style.width = timerCnt + "px"
    },50)
}
sliderBox.addEventListener("mouseover",() =>{
  clearInterval(timerSlider)
})
sliderBox.addEventListener("mouseleave",() =>{
  updateSlider()
})
nextButton.addEventListener("click", () => {
    currentSlide++;
    timerCnt = 0
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    updateSlider();
});

prevButton.addEventListener("click", () => {
    currentSlide--;
    timerCnt = 0
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateSlider();
});

updateSlider();

//form
const form = document.querySelector("[data-js-form]");
const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const messageInput = document.querySelector("#messageInput");
const submitButton = document.querySelector("#submitButton");

form.addEventListener("submit", async (event) => {
  event.preventDefault();


  const data = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    message: messageInput.value.trim(),
  };

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const response = await fetch("http://localhost:3000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Ошибка с backend:", errorData);
      throw new Error(errorData.message || "Ошибка отправки");
    }

    form.reset();
    submitButton.textContent = "Sent!";
  } catch (error) {
    console.error(error);
    submitButton.textContent = "Error";
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send massage";
    }, 2000);
  }
});