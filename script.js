// Smooth scroll
document.querySelectorAll("nav a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Contact form AJAX
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("formStatus").textContent = result.message;
    if (res.ok) form.reset();
  });
}

// Lightbox for social gallery
const galleryImgs = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

if (galleryImgs) {
  galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}
