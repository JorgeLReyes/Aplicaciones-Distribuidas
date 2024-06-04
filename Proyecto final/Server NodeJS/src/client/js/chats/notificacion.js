import { Notificacion } from "../sockets.js";

Notificacion.notification((asunto) => {
  if (Notification.permission === "granted") {
    const options = {
      body: `Asunto\n${asunto}`,
      lang: "ES",
      tag: "notify",
      dir: "auto",
      renotify: "true",
      icon: "../../img/logo.svg",
      requireInteraction: true,
    };
    new Notification("Nuevo mensaje en Bandeja de entrada", options);
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (Notification.permission === "denied") {
    Notification.requestPermission();
  }
});
