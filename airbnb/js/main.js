//console.log("js has been loaded");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn")

menuBtn.addEventListener("click", function() {
    //console.log("clicked!")
    mobileMenu.classList.add("active");
}); //end of menuBtn click

closeBtn.addEventListener("click", function() {
    mobileMenu.classList.remove("active");
});