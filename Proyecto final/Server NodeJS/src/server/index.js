import "dotenv/config";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import apiRoutes from "./routes/api.routes.js";
import { verificarSessionPage } from "./Middleware/session.js";
import chatController from "./controllers/chats/chatController.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const connectedUsers = new Map();
const connectedUsersGlobal = new Map();

const sessionUser = session({
  secret: "secret-key",
  resave: true,
  saveUninitialized: true,
});

app.use(express.json());
app.use(express.static(__dirname + "../client"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(sessionUser);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", true);

io.engine.use(sessionUser);

io.on("connection", (socket) => {
  const session = socket.request.session;
  if (session._id) {
    if (connectedUsersGlobal.has(session._id)) {
      connectedUsersGlobal.set(session._id, {
        ...connectedUsersGlobal.get(session._id),
        [session.ip]: socket.id,
      });
    } else {
      connectedUsersGlobal.set(session._id, {
        [session.ip]: socket.id,
      });
    }
  }

  // CHAT
  socket.on("client:getBandeja", () => {
    if (connectedUsers.has(session._id)) {
      connectedUsers.set(session._id, [
        ...connectedUsers.get(session._id),
        socket.id,
      ]);
    } else {
      connectedUsers.set(session._id, [socket.id]);
    }
    chatController.getBandeja(socket, session._id);
  });

  socket.on("client:getMensaje", (id, tipoMensaje) => {
    chatController.getMensaje(io, socket, id, tipoMensaje, connectedUsers);
  });

  socket.on("client:getUsuarios", () => chatController.getUsuarios(socket));

  socket.on("client:addMensaje", (response) => {
    chatController.addMensaje(
      io,
      response,
      session,
      connectedUsers,
      connectedUsersGlobal
    );
  });

  socket.on("client:doneMensaje", (id) =>
    chatController.doneMensaje(socket, id)
  );

  socket.on("client:deleteMensaje", (obj) =>
    chatController.deleteMensaje(socket, obj)
  );

  socket.on("disconnect", () => {
    if (session._id) {
      if (connectedUsers.has(session._id)) {
        const index = connectedUsers
          .get(session._id)
          .findIndex((e) => e === socket.id);
        if (index !== -1) {
          connectedUsers.get(session._id).splice(index, 1);
        }

        if (!connectedUsers.get(session._id).length)
          connectedUsers.delete(session._id);
      }
    }

    if (connectedUsersGlobal.has(session._id)) {
      delete connectedUsersGlobal.get(session._id)[session.ip];
      if (!Object.keys(connectedUsersGlobal.get(session._id)).length)
        connectedUsersGlobal.delete(session._id);
    }
  });
});

app.use(indexRoutes);
app.use(apiRoutes);
app.use("*", verificarSessionPage, (req, res) =>
  res.render("./error/error404", {
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

server.listen(3000, () =>
  console.log("Servidor iniciado en http://localhost:3000")
);
