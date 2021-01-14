const lineContainer = document.querySelector(".line-container");
const menu = document.querySelector(".menu");

lineContainer.addEventListener("click", () => {
  lineContainer.classList.toggle("active");
  menu.classList.toggle("active");
});
