// Navbar scroll animation
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Fade-in effect on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const handleFadeIn = () => {
    fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn); // Trigger on load
