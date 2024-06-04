import axiosRequest from "../../helpers/axios.js";
import googleController from "../googleAPI/googleController.js";
import { dataError } from "../mensajes/mensajesDataController.js";

const getUsuarios = async (socket) => {
  try {
    const { getUsers } = await axiosRequest({
      query: "query{getUsers{id nombre correo}}",
    });
    socket.emit("server:responseUsuarios", getUsers);
  } catch (error) {}
};

const setView = async (io, id, connectedUsers) => {
  try {
    const fecha = new Date().toLocaleString("ja-JP");
    const { updateMessage } = await axiosRequest({
      query: `mutation { updateMessage(input: {id:${id}, visto:"${fecha}"} ){id usuario_id} }`,
    });

    const connect = connectedUsers.get(updateMessage.usuario_id);
    if (connect) {
      connect.forEach((socketId) => {
        io.to(socketId).emit("server:responseDateBandeja", updateMessage);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMensaje = async (
  io,
  socket,
  idMessage,
  tipoMensaje,
  connectedUsers
) => {
  try {
    const { getMessage: mensaje } = await axiosRequest({
      query: `
        query {
          getMessage(id: ${idMessage}) {
            id
            fecha
            usuario_id
            usuario_id_nombre
            usuario_dest
            usuario_dest_nombre
            mensaje
            asunto
            visto
            atendido
            url
            delete_uid
            delete_udest
          }
        }
      `,
    });

    const response = {};

    if (!mensaje.visto) setView(io, idMessage, connectedUsers);
    if (tipoMensaje === "pendiente") {
      response.usuario_id = mensaje.usuario_id;
      response.nombre = mensaje.usuario_id_nombre;
    } else {
      response.usuario_id = mensaje.usuario_dest;
      response.nombre = mensaje.usuario_dest_nombre;
    }

    if (mensaje.url) {
      let docBuffer;
      const docStream = await googleController.downloadAndSaveFile(mensaje.url);
      docBuffer = await new Promise((resolve, reject) => {
        const dataChunks = [];
        docStream.on("data", (chunk) => dataChunks.push(chunk));
        docStream.on("end", () => resolve(Buffer.concat(dataChunks)));
        docStream.on("error", reject);
      });
      response.doc = docBuffer;
    }
    socket.emit("server:responseMensaje", { ...mensaje, ...response });
  } catch (error) {
    console.log(error);
  }
};

const getPendientes = async (_id) => {
  try {
    let { getMessages } = await axiosRequest({
      query: `query { getMessages(id: "${_id}", column: "usuario_dest") { id fecha usuario_id usuario_id_nombre usuario_dest usuario_dest_nombre mensaje asunto visto atendido url delete_uid delete_udest } }`,
    });

    getMessages = getMessages.map((e) => {
      const { usuario_id_nombre, ...data } = e;
      return { ...data, nombre: usuario_id_nombre };
    });

    return getMessages;
  } catch (error) {
    return error;
  }
};

const getEnviados = async (_id) => {
  try {
    let { getMessages } = await axiosRequest({
      query: `query { getMessages(id: "${_id}", column: "usuario_id") { id fecha usuario_id usuario_id_nombre usuario_dest usuario_dest_nombre mensaje asunto visto atendido url delete_uid delete_udest } }`,
    });
    getMessages = getMessages.map((e) => {
      const { usuario_dest_nombre, ...data } = e;
      return { ...data, nombre: usuario_dest_nombre };
    });

    return getMessages;
  } catch (error) {
    return error;
  }
};

const getBandeja = async (socket, session) => {
  const [pendientes, enviados] = await Promise.all([
    getPendientes(session),
    getEnviados(session),
  ]);
  socket.emit("server:responseBandeja", {
    pendientes,
    enviados,
  });
};

const getPendiente = async (usuario_id, id) => {
  try {
    let { getLastMessage } = await axiosRequest({
      query: `
    query getLastMessage($id: [Int!]!, $column: String!, $usuario: ID!) {
      getLastMessage(id: $id, column: $column, usuario: $usuario) {
        id
        fecha
        usuario_id
        usuario_id_nombre
        usuario_dest
        usuario_dest_nombre
        mensaje
        asunto
        visto
        atendido
        url
        delete_uid
        delete_udest
      }
    }
  `,
      variables: {
        id,
        column: "usuario_dest",
        usuario: usuario_id,
      },
    });

    getLastMessage = getLastMessage.map((e) => {
      const { usuario_dest_nombre, ...data } = e;
      return { ...data, nombre: usuario_dest_nombre };
    });

    return getLastMessage;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getEnviado = async (usuario_id, id) => {
  try {
    let { getLastMessage } = await axiosRequest({
      query: `
    query getLastMessage($id: [Int!]!, $column: String!, $usuario: ID!) {
      getLastMessage(id: $id, column: $column, usuario: $usuario) {
        id
        fecha
        usuario_id
        usuario_id_nombre
        usuario_dest
        usuario_dest_nombre
        mensaje
        asunto
        visto
        atendido
        url
        delete_uid
        delete_udest
      }
    }
  `,
      variables: {
        id,
        column: "usuario_id",
        usuario: usuario_id,
      },
    });

    getLastMessage = getLastMessage.map((e) => {
      const { usuario_dest_nombre, ...data } = e;
      return { ...data, nombre: usuario_dest_nombre };
    });

    return getLastMessage;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addMensaje = async (
  io,
  dataMensaje,
  session,
  connectedUsers,
  connectedUsersGlobal
) => {
  try {
    const destinatarios = dataMensaje.usuarios_dest;
    const fecha = new Date().toLocaleString("ja-JP");

    const array = destinatarios.map((e) => {
      const { asunto, mensaje, url } = dataMensaje;
      return {
        asunto,
        mensaje,
        usuario_dest: e,
        usuario_id: session._id,
        fecha,
        url: url
          ? `https://drive.google.com/file/d/${url}/view?usp=drivesdk`
          : null,
      };
    });

    const { addMessage } = await axiosRequest({
      query: `
      mutation addMessages($input: [AddMessage!]) {
        addMessage(input: $input) {
          id
        }
      }`,
      variables: {
        input: array,
      },
    });
    const ids = addMessage.map((message) => parseInt(message.id));

    destinatarios.forEach((e) => {
      if (connectedUsersGlobal.get(e)) {
        const emitir = Object.values(connectedUsersGlobal.get(e));
        emitir.forEach((socketId) => {
          io.to(socketId).emit("Notificacion", dataMensaje.asunto);
        });
      }
    });

    if (!destinatarios.includes(session._id)) {
      destinatarios.unshift(session._id);
    }

    destinatarios.forEach(async (e) => {
      const connect = connectedUsers.get(e);
      if (connect) {
        const [pendientes, enviados] = await Promise.all([
          getPendiente(e, ids),
          getEnviado(e, ids),
        ]);
        connect.forEach((socketId) => {
          io.to(socketId).emit("server:responseSetBandeja", {
            pendientes,
            enviados,
          });
        });
      }
    });
  } catch (error) {
    // console.log(error);
  }
};

const doneMensaje = async (socket, id) => {
  try {
    const fecha = new Date().toLocaleString("ja-JP");

    const { updateMessage } = await axiosRequest({
      query: `mutation { updateMessage(input: {id:${id}, atendido:"${fecha}"} ){id usuario_id} }`,
    });

    socket.emit("server:doneMensaje", updateMessage);
  } catch (error) {
    console.log(error);
  }
};

const deleteMensaje = async (socket, obj) => {
  try {
    const column = obj.column === "pendiente" ? "delete_udest" : "delete_uid";
    const { updateMessage } = await axiosRequest({
      query: `mutation { updateMessage(input: {id:${obj.id}, ${column}:true} ){id usuario_id} }`,
    });

    const { getMessage: mensaje } = await axiosRequest({
      query: `
        query { getMessage(id: ${obj.id}) { url delete_uid delete_udest} } `,
    });

    if (mensaje.delete_uid && mensaje.delete_udest) {
      await axiosRequest({
        query: ` mutation { deleteChat(id: ${obj.id}) {id} } `,
      });
    }

    const { getUrl } = await axiosRequest({
      query: `query { getUrl( url: \"${mensaje.url}\" ){url} }`,
    });
    if (!getUrl && mensaje.url) await googleController.deleteFile(mensaje.url);
    socket.emit("server:deleteMensaje", updateMessage.id);
  } catch (error) {
    dataError({
      socket,
      error: true,
      msj: "Error al eliminar el mensaje",
    });
  }
};

export default {
  getBandeja,
  getMensaje,
  getUsuarios,
  addMensaje,
  doneMensaje,
  deleteMensaje,
};
