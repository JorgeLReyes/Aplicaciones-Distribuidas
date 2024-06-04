import request from "../helpers/peticionesSupabase.js";

document.addEventListener("submit", (e) => {
  if (e.target.matches("form")) {
    e.preventDefault();
    const data = new FormData(e.target);
    const credentials = {};

    for (const [key, value] of data) {
      credentials[key] = value;
    }

    request({ method: "post", url: "/api/login", data: { credentials } })
      .then((res) => {
        if (document.querySelector(".error"))
          document.querySelector(".error").remove();
        location.href = res.location;
      })
      .catch(() => {
        if (document.querySelector(".error"))
          document.querySelector(".error").remove();
        setTimeout(() => {
          const mensaje = `<p class="error">Los datos están incorrectos. Verifiquelos de nuevo.</p>`;
          checkbox.insertAdjacentHTML("beforebegin", mensaje);
        }, 100);
      });
  }
});
