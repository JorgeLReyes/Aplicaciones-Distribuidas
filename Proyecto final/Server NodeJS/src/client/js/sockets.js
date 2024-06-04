const socket = io();

socket.on("prueba", () => console.log("cliente escuchando servidor"));

// CHAT
const getChat = () => {
  socket.emit("client:getBandeja");
};

const getMensaje = (id, tipoMensaje) => {
  socket.emit("client:getMensaje", id, tipoMensaje);
};

const responseChat = (callback) => {
  socket.on("server:responseBandeja", (data) => callback(data));
};

const responseNewChat = (callback) => {
  socket.on("server:responseSetBandeja", (data) => callback(data));
};

const responseDateBandeja = (callback) => {
  socket.on("server:responseDateBandeja", (data) => callback(data));
};

const responseMensaje = (callback) => {
  socket.on("server:responseMensaje", (data) => callback(data));
};

const getUsuarios = () => socket.emit("client:getUsuarios");

const responseUsuarios = (callback) =>
  socket.on("server:responseUsuarios", (data) => callback(data));

const addMensaje = (data) => socket.emit("client:addMensaje", data);

const doneMensaje = (id) => socket.emit("client:doneMensaje", id);

const doneServerMensaje = (data) => socket.on("server:doneMensaje", data);

const deleteMensaje = (id, column) =>
  socket.emit("client:deleteMensaje", { id, column });

const deleteMensajeBandeja = (callback) =>
  socket.on("server:deleteMensaje", (id) => callback(id));

export const Chat = {
  getChat,
  responseChat,
  responseNewChat,
  responseDateBandeja,
  getMensaje,
  responseMensaje,
  getUsuarios,
  responseUsuarios,
  addMensaje,
  doneMensaje,
  doneServerMensaje,
  deleteMensaje,
  deleteMensajeBandeja,
};

const notification = (callback) =>
  socket.on("Notificacion", (asunto) => callback(asunto));

const mensaje = (callback) =>
  socket.on("server:mensaje", (obj) => callback(obj));

const dataOk = (callback) => socket.on("server:dataOk", (obj) => callback(obj));

const dataError = (callback) =>
  socket.on("server:dataError", (obj) => callback(obj));

export const Notificacion = { notification, mensaje, dataOk, dataError };
