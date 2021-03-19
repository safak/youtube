const play = document.querySelector(".play");
const bigContainer = document.querySelector(".big-trailer");
const cancel = document.querySelector(".cancel");

play.addEventListener("click", () => {
  bigContainer.style.display = "block";
});
cancel.addEventListener("click", () => {
  bigContainer.style.display = "none";
});

const right = document.querySelector(".right");
const image = document.querySelector(".slider-img");
const counterItems = document.querySelectorAll(".counter-item");

const imgList = [
  "media/slider1.jpeg",
  "media/slider2.jpg",
  "media/slider3.png",
  "media/slider4.jpg",
];

image.src = imgList[0];
let i = 1;

right.addEventListener("click", () => {
  i > 0
    ? counterItems[i - 1].classList.remove("active")
    : counterItems[imgList.length - 1].classList.remove("active");
  counterItems[i].classList.add("active");
  image.src = imgList[i];
  i === imgList.length - 1 ? (i = 0) : i++;
});

const container = document.querySelector(".container");

setTimeout(() => {
  container.style.opacity = 1;
}, 30000);
