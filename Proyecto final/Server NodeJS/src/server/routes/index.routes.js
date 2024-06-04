import { Router } from "express";
import {
  verificarSessionPage,
  verificarSessionLogin,
} from "../Middleware/session.js";

const router = Router();

router.get("/", verificarSessionLogin, (req, res) =>
  res.render("./admin/index")
);
router.get("/registrarse", (req, res) => res.render("./admin/registrarse"));

router.get("/usuarios", verificarSessionPage, (req, res) =>
  res.render("./admin/userAccess", {
    title: "FastSend | Usuarios",
    titleSection: "Usuarios",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/chat", verificarSessionPage, (req, res) =>
  res.render("./chats/chat", {
    title: "FastSend | Chat",
    titleSection: "Chat interno",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/configuracion", verificarSessionPage, (req, res) =>
  res.render("./admin/config", {
    title: "FastSend | Configuración",
    titleSection: "Configuración",
    user: req.session.nombre,
    rol: req.session.rolUser,
    email: req.session.user,
  })
);

export default router;
