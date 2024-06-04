const nav = document.getElementById("nav");
// const sectionList = document.querySelector(".nav-item.list").nextElementSibling;

nav.addEventListener("mouseenter", (e) => {
  if (window.innerWidth < 1024) return;
  nav.classList.remove("close");
});

nav.addEventListener("mouseleave", (e) => {
  if (window.innerWidth < 1024) return;

  nav.classList.add("close");
});

document.addEventListener("click", async (e) => {
  if (e.target.closest(".nav-item.list")) {
    if (!nav.classList.contains("close")) {
      sectionList.classList.toggle("height-0");
    }
  }
  if (e.target.closest("#main")) {
    nav.classList.toggle("close");

    !sectionList.classList.contains("height-0") &&
      sectionList.classList.add("height-0");
  }
  if (e.target.closest("#session")) {
    try {
      const res = await fetch("/destruir-sesion", { method: "POST" });
      const { location: url } = await res.json();
      location.href = url;
    } catch (err) {
      console.log(err);
    }
  }
});
