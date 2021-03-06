const subButton = document.querySelector(".sub-button");
const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");

subButton.addEventListener("click",()=>{
    modal.style.display = "flex"
})

cancel.addEventListener("click",()=>{
    modal.style.display = "none"
})
