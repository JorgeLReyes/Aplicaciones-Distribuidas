let timer;

document.addEventListener("click", (e) => {
  if (e.target.closest(".close-alert")) {
    e.target.closest(".alert").remove();
    const alerts = document.querySelectorAll(".alert");
    Array.from(alerts).forEach((e) => {
      const top = e.style.getPropertyValue("top");
      e.style.setProperty("top", `calc( ${top} - (48px + .5rem) )`);
    });
  }
});

const mensajes = ({ mensaje, color, icon }) => {
  let alerts;
  if (document.querySelector(".alert") !== null)
    alerts = document.querySelectorAll(".alert").length;

  const alert = document.createElement("section");
  alert.classList.add("alert");
  alert.setAttribute("style", `--color-msj:${color}`);
  if (alerts)
    if (alerts) {
      alert.style.setProperty(
        "top",
        `calc( var(--top-alert) + (48px + .5rem) * ${alerts})`
      );
    }

  const section = `
    <section class="alert-container flex">
      <span class="flex span-icon">${icon}${mensaje} </span>
      <button class="flex close-alert">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </section>`;

  alert.innerHTML = section;
  document.querySelector("main").insertAdjacentElement("beforeend", alert);
  timer = setTimeout((e) => {
    // deleteMessage();
    alert.remove();
  }, 5000);
};

export default mensajes;
