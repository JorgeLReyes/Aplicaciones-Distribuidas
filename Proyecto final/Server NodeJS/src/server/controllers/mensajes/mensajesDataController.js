const dataOK = ({ socket, error, msj, grupo }) => {
  grupo
    ? socket.to(grupo).emit("server:dataOk", { error, msj })
    : socket.emit("server:dataOk", { error, msj });
};

const dataError = ({ socket, error, msj }) =>
  socket.emit("server:dataError", { error, msj });

export { dataOK, dataError };
