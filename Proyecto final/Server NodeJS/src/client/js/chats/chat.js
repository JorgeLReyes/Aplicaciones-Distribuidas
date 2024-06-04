import { Chat } from "../sockets.js";
import Loader from "../../components/Loader.js";
import Mensajes from "../../components/Alert.js";

const $pendientes = document.getElementById("pendientes"),
  $enviados = document.getElementById("enviados"),
  $lector = document.querySelector(".chat-lector"),
  $main = document.querySelector("main"),
  loader = Loader();

let usuarios,
  selectUsuarios,
  usuariosSelect = [],
  mensajeSendType,
  filePreview,
  file = null;

const cards = (data, mensajeType) => {
  const fragment = document.createDocumentFragment();
  if (!data.length) {
    const section = document.createElement("section");
    section.classList.add("card-container");
    section.insertAdjacentHTML("beforeend", "<p>Sin mensajes</p>");
    fragment.append(section);
  }
  data.forEach((e) => {
    const {
      asunto,
      fecha,
      id,
      nombre,
      mensaje,
      visto,
      atendido,
      delete_uid,
      delete_udest,
    } = e;
    console.log(id);
    console.log(mensajeType);
    console.log(delete_uid, delete_udest);
    if (
      (mensajeType === "pendiente" && delete_udest) ||
      (mensajeType === "enviado" && delete_uid)
    )
      return;

    console.log(visto);
    const section = document.createElement("section");
    section.dataset.id = id;
    section.dataset.mensaje = mensajeType;
    section.classList.add("card-container");

    if (mensajeType === "pendiente" && !visto) {
      section.classList.add("not-view");
    }

    const cardMessage = `
      <section class="flex card-header">
        <h3 class="flex card-title">
          ${
            mensajeType === "pendiente" && atendido
              ? "<ion-icon name='checkmark-circle-outline'></ion-icon>"
              : ""
          }
          <span>${asunto}</span>
        </h3>
        <p class="card-fecha">${fecha.replace("T", " ")}</p>
      </section>
      <section class="flex card-body">
        ${nombre ? "<p class='card-user'>" + nombre + `</p>` : ""}
        <p class="flex card-mensaje">
          ${
            mensajeType === "enviado"
              ? `
                <ion-icon name="checkmark-${
                  visto ? "done-" : ""
                }outline" class="${visto ? "check" : "uncheck"}"></ion-icon>
              `
              : ""
          }
          <span>${mensaje}</span>
        </p>
      </section>
    `;
    section.insertAdjacentHTML("beforeend", cardMessage);
    fragment.append(section);
  });
  return fragment;
};

const mensajeView = (data) => {
  console.log(data);
  $lector.innerHTML = "";
  const { asunto, fecha, id, nombre, mensaje, visto, atendido, doc } = data;
  doc && (filePreview = doc);
  const section = document.createElement("section");
  section.dataset.id = id;
  console.log(data);
  section.classList.add("flex", "mensaje-container");
  const cardMessage = `
      <section class="flex mensaje-header">
        <section class="flex mensaje-title">
          <h3>${asunto}</h3>
          ${
            atendido
              ? '<button class="flex btn-mensaje-title"><ion-icon name="trash-outline"></ion-icon></button>'
              : ""
          }
            </section>
        <section class="flex mensaje-data">
          <p class="mensaje-user">${nombre}</p>
          <p class="mensaje-fecha">${fecha.replace("T", " ")}</p>
        </section>
      </section>
      <section class="mensaje-body">
        <p class="mensaje-text">${mensaje}</p>
        ${
          doc
            ? `<div class="flex preview-container">
            <button type="button" class="btnPreview">Ver documento</button>
          </div>`
            : ""
        }
      </section>
      <section class="flex mensaje-footer">
      ${
        mensajeSendType === "pendiente"
          ? !atendido
            ? `
          <section class="flex mensaje-footer-buttons">
            <button class="btn-done">Realizado</button>
          </section>`
            : `
          <section class="flex mensaje-footer-buttons">
            <ion-icon name="checkmark-circle-outline"></ion-icon>  
            <p>Accion realizada</p>
          </section>`
          : atendido
          ? ` <p>Atendido el ${atendido.replace("T", " a las ")}</p></section>`
          : ""
      }
        ${
          mensajeSendType === "enviado" && visto
            ? `<section>
            <p>Visto el ${visto.replace("T", " a las ")}</p></section>`
            : ""
        }
      </section>
    `;
  section.insertAdjacentHTML("afterbegin", cardMessage);
  $lector.insertAdjacentElement("afterbegin", section);
};

const previewDocTarget = ({ name }) => {
  const preview = document.querySelector(".preview");
  if (preview.childElementCount) {
    preview.querySelector("p").innerHTML = name;
  } else {
    let htmlString = `
    <div class="flex preview-img">
    <img src="/img/pdf.png" alt="icono de PDF">
    </div>
    <section class="flex preview-title">
    <button class="flex" type="button" id="preview">
    <p>${name}</p>
    <ion-icon name="open-outline"></ion-icon>
    </button>
    </section>  
    `;

    preview.innerHTML = htmlString;
  }
};

const options = (data) => {
  const fragment = document.createDocumentFragment();

  const optionDefect = document.createElement("option");
  optionDefect.textContent = "Selecciona un usuario";

  fragment.append(optionDefect);

  data.forEach((e) => {
    const { correo, nombre } = e;
    const option = document.createElement("option");
    option.value = correo;
    option.textContent = nombre + " - " + correo;
    option.dataset.nombre = nombre;
    fragment.append(option);
  });

  selectUsuarios = fragment;
};

const formMensaje = () => {
  if (document.querySelector(".form-container")) {
    document.querySelector(".form-container").remove();
  }
  const section = document.createElement("section");
  section.classList.add("flex", "form-container");
  const html = `
    <section class="flex form-header">
      <section class="form-title">
        <h3>Mensaje nuevo</h3>
      </section>
      <button class="flex form-header-close">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </section>
    <section class="flex form-body">
      <form class="flex form-mensaje">
        <section class="flex form-input form-input-users">
          <label>Para</label>
          <section class="flex form-send-users"></section>
          <select name="usuario_dest" placeholder="Destinatarios"></select>
        </section>
        <section class="form-input">
          <input type="text" name="asunto" placeholder="Asunto">
        </section>
        <section class="flex form-input textarea">
          <textarea name="mensaje" placeholder="Mensaje"></textarea>
        </section>
        <article class="flex drop-zone">
          <p class="flex">
            <span>Arrastra y suelta un archivo PDF</span>
            <span>O</span>
          </p>
          <button type="button">Selecciona un archivo PDF</button>
          <input type="file" id="documento" accept=".pdf" hidden>
        </article>
        <section class="flex preview"></section>
        <section class="flex form-input">
          <button type='submit' class="flex">
            <ion-icon name="send-outline"></ion-icon>
            <span>Enviar</span>
          </button>
        </section>
      </form>
    </section>
  `;

  section.innerHTML = html;
  $main.insertAdjacentElement("beforeend", section);
};

const addUser = (value, text) => {
  const user = document.querySelector(".form-send-users");
  const userCard = document.createElement("section");
  userCard.classList.add("flex", "form-user-select");

  const html = `
    <p>${text}</p>
    <button type="button" class="flex delete-user">
       <ion-icon name="close-outline"></ion-icon>
    </button>
  `;

  userCard.innerHTML = html;
  userCard.dataset.correo = value;
  userCard.title = value;
  user.append(userCard);
};

Chat.responseChat((data) => {
  const { pendientes, enviados } = data;
  console.log(data);
  $pendientes.innerHTML = "";
  $enviados.innerHTML = "";

  $pendientes.append(cards(pendientes, "pendiente"));
  $enviados.append(cards(enviados, "enviado"));
});

Chat.responseMensaje((data) => {
  console.log(data);
  mensajeView(data);
});

Chat.responseUsuarios((data) => {
  console.log(data.getUsers);
  usuarios = data;
  selectUsuarios = null;
  options(usuarios);
  loader.remove();
});

Chat.responseNewChat((data) => {
  const { pendientes, enviados } = data;

  if (pendientes.length) {
    $pendientes.querySelector(".card-container:not([data-id])")?.remove();
    const cardPendientes = cards(pendientes, "pendiente");
    $pendientes.prepend(cardPendientes);
    Mensajes({
      mensaje: "Nuevo mensaje",
      color: "var(--color-yellow)",
      icon: '<ion-icon name="alert-circle-outline"></ion-icon>',
    });
  }
  if (enviados.length) {
    $enviados.querySelector(".card-container:not([data-id])")?.remove();
    const cardEnviados = cards(enviados, "enviado");
    $enviados.prepend(cardEnviados);
    Mensajes({
      mensaje: "Mensaje enviado",
      color: "var(--color-green)",
      icon: "<ion-icon name='checkmark-done-outline'></ion-icon>",
    });
  }
});

Chat.responseDateBandeja((data) => {
  console.log(data);
  const { id } = data;

  const card = document.querySelector(
    `.chat-messages-container:last-child .card-container[data-id='${id}']`
  );
  console.log(card);
  const view = card.querySelector("ion-icon");
  console.log(view);
  view.setAttribute("name", "checkmark-done-outline");
  view.classList.add("check");
  view.classList.remove("uncheck");
});

Chat.doneServerMensaje((data) => {
  console.log(data);
  const mensaje = document.querySelector(".mensaje-container");
  console.log(mensaje);
  const realizado = mensaje.querySelector(".mensaje-footer-buttons");
  const card = document.querySelector(
    `.chat-messages-container:first-child .card-container[data-id='${mensaje.dataset.id}'] .card-title`
  );

  const html = `
  <ion-icon name="checkmark-circle-outline"></ion-icon>  
  <p>Accion realizada</p>
  `;
  console.log(card);
  const icon = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
  card.insertAdjacentHTML("afterbegin", icon);
  realizado.innerHTML = html;
});

Chat.deleteMensajeBandeja((id) => {
  console.log(id);
  document.querySelector(`.check-mensaje[data-id="${id}"]`).remove();
  const html = `
      <section class="flex chat-bg">
        <ion-icon name="mail-outline"></ion-icon>
        <span>Haz click en un mensaje para visualizarlo</span>
        <span>o</span>
        <button class="btn-add">Manda un mensaje</button>
      </section>`;
  $lector.innerHTML = html;
});

document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "denied") Notification.requestPermission();
  $main.insertAdjacentElement("beforeend", loader);
  Chat.getChat();
  Chat.getUsuarios();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".card-container")) {
    let check = document.querySelector(".check-mensaje");
    if (check) {
      check.classList.remove("check-mensaje");
    }

    const container = e.target.closest(".card-container");
    if (check !== container) container.classList.add("check-mensaje");

    if (container.classList.contains("check-mensaje")) {
      console.log("Mensaje seleccionado");
      console.log(container.dataset.id);
      container.classList.remove("not-view");
      mensajeSendType = container.dataset.mensaje;
      Chat.getMensaje(container.dataset.id, container.dataset.mensaje);
    } else {
      const html = `
      <section class="flex chat-bg">
        <ion-icon name="mail-outline"></ion-icon>
        <span>Haz click en un mensaje para visualizarlo</span>
        <span>o</span>
        <button class="btn-add">Manda un mensaje</button>
      </section>`;
      $lector.innerHTML = html;
    }
  }
  if (e.target.closest(".btn-add")) {
    formMensaje();
    options(usuarios);
    usuariosSelect = [];
    const $select = document.querySelector("[name='usuario_dest']");
    $select.append(selectUsuarios.cloneNode(true));
  }
  if (e.target.closest(".delete-user")) {
    console.log(usuariosSelect);

    const userCard = e.target.closest(".form-user-select");
    console.log(userCard.dataset.correo);
    const index = usuariosSelect.indexOf(userCard.dataset.correo);
    usuariosSelect.splice(index, 1);

    const nuevo = usuarios.filter((e) => !usuariosSelect.includes(e.correo));
    options(nuevo);
    const $select = document.querySelector("[name='usuario_dest']");
    $select.innerHTML = "";
    $select.append(selectUsuarios);

    userCard.remove();
  }
  if (e.target.closest(".form-header-close")) {
    document.querySelector(".form-container").remove();
  }
  if (e.target.closest(".btn-done")) {
    e.target.disabled = true;
    const mensaje = e.target.closest(".mensaje-container");
    const id = mensaje.dataset.id;
    console.log(id);
    Chat.doneMensaje(id);
  }
  if (e.target.closest(".btnPreview")) {
    const main = document.querySelector(".main-child");
    const uint8Array = new Uint8Array(filePreview);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(blob);
    const frame = `
    <section class="flex preview-doc">
      <iframe src=${fileURL}></iframe>
      <button type="button" id="cerrar">Cerrar</button>
    </section>
    `;
    main.insertAdjacentHTML("beforeend", frame);
  }
  if (e.target.closest("#preview")) {
    const main = document.querySelector(".main-child");
    const fileURL = URL.createObjectURL(file);
    const frame = `
    <section class="flex preview-doc">
      <iframe src=${fileURL}></iframe>
      <button type="button" id="cerrar">Cerrar</button>
    </section>
    `;
    main.insertAdjacentHTML("beforeend", frame);
  }
  if (e.target.closest("#cerrar")) {
    const frame = document.querySelector(".preview-doc");
    frame.remove();
  }
  if (e.target.closest(".drop-zone")) {
    const input = e.target.closest(".drop-zone").querySelector("#documento");
    input.accept = ".pdf";
    input.multiple = false;
    input.click();
  }
  if (e.target.closest(".btn-mensaje-title")) {
    const response = confirm(
      "¿Está seguro de eliminar este mensaje de su bandeja?"
    );
    const mensaje = document.querySelector(".check-mensaje");

    if (!mensaje)
      return Mensajes({
        mensaje: "Seleccione un mensaje para eliminar",
        color: "var(--color-red)",
        icon: "<ion-icon name='alert-outline'></ion-icon>",
      });

    if (!response) return;

    const id = mensaje.dataset.id;
    const column = mensaje.dataset.mensaje;

    Chat.deleteMensaje(id, column);
  }
});

document.addEventListener("change", (e) => {
  if (e.target.closest("[name='usuario_dest']")) {
    const value = e.target.value;

    const text = e.target.querySelector(`option[value='${value}']`).dataset
      .nombre;

    if (value) {
      usuariosSelect.push(value);
      const nuevo = usuarios.filter((e) => !usuariosSelect.includes(e.correo));
      console.log(nuevo);
      addUser(value, text);
      options(nuevo);
      e.target.innerHTML = "";
      e.target.append(selectUsuarios);
    }
  }
  if (e.target.closest("#documento")) {
    if (e.target.files.length) {
      file = e.target.files[0];
      console.log(file);
      previewDocTarget(file);
    }
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.target.matches(".form-mensaje")) {
    const formContainer = document.querySelector(".form-container");
    formContainer.insertAdjacentElement("beforeend", loader);
    const usuariosForm = document.querySelectorAll(".form-user-select");
    const asunto = document.querySelector("[name='asunto']");
    const mensaje = document.querySelector("[name='mensaje']");

    if (!usuariosForm.length) return alert("Seleccione al menos un usuario");
    if (!asunto.value.trim()) return alert("Rellene el asunto");
    if (!mensaje.value.trim()) return alert("Agregue un mensaje ");
    // if (!file) return alert("Seleccione un archivo");

    const usuarios_dest = Array.from(usuariosForm).map(
      (e) => usuarios.find((obj) => obj["correo"] === e.dataset.correo).id
    );
    try {
      let id = null;
      if (file) {
        const form = new FormData();
        form.append("documento", file);
        const res = await fetch("/up-file", {
          method: "PUT",
          body: form,
        });
        const { error, id: idFile } = await res.json();

        if (error) throw error;
        file = null;
        id = idFile;
      }

      const response = {
        asunto: asunto.value.trim(),
        mensaje: mensaje.value.trim(),
        usuarios_dest,
        url: id,
      };
      Chat.addMensaje(response);
      loader.remove();
      Mensajes({
        mensaje: "Enviando mensaje...",
        color: "var(--color-blue)",
        icon: "<ion-icon name='mail-outline'></ion-icon>",
      });
      formContainer.remove();
    } catch (error) {
      Mensajes({
        mensaje: error,
        color: "var(--color-red)",
        icon: "<ion-icon name='mail-outline'></ion-icon>",
      });
    }
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (e.target.closest(".drop-zone")) {
    const dropText = e.target.querySelector("p"),
      button = e.target.querySelector("button");
    e.target.classList.add("active");
    dropText.textContent = "Soltar archivo";
    button.style.display = "none";
  }
});

document.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (e.target.closest(".drop-zone")) {
    const dropText = e.target.querySelector("p"),
      button = e.target.querySelector("button");
    button.style.display = "block";
    e.target.classList.remove("active");
    dropText.innerHTML = `
    <span>Arrastra y suelta un archivo PDF</span>
    <span>O</span>
  `;
  }
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.target.closest(".drop-zone")) {
    const dropText = e.target.querySelector("p"),
      button = e.target.querySelector("button");
    button.style.display = "block";
    dropText.innerHTML = `
    <span>Arrastra y suelta un archivo PDF</span>
    <span>O</span>
  `;
    e.target.classList.remove("active");
    if (
      e.dataTransfer.files.length === 1 &&
      e.dataTransfer.files[0].type === "application/pdf"
    ) {
      file = e.dataTransfer.files[0];
      previewDocTarget(file);
      console.log(file);
    } else {
      alert("Solo se puede subir un archivo a la vez con extensión PDF");
    }
  }
});
