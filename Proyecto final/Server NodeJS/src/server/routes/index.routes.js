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
    title: "CONAGUA",
    titleSection: "Usuarios",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/inventarios/empleados", verificarSessionPage, (req, res) =>
  res.render("empleados", {
    title: "CONAGUA",
    titleSection: "Inventarios",
    titleTable: "Empleados",
    mostrar: true,
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get(
  "/inventarios/infraestructura/dispositivos",
  verificarSessionPage,
  (req, res) =>
    res.render("dispositivos", {
      title: "CONAGUA",
      titleSection: "Inventarios",
      titleTable: "Infraestructura tecnológica",
      navegacion: true,
      mostrar: true,
      user: req.session.nombre,
      rol: req.session.rolUser,
    })
);

router.get(
  "/inventarios/infraestructura/equipos",
  verificarSessionPage,
  (req, res) =>
    res.render("./equipos/index", {
      title: "CONAGUA",
      titleSection: "Inventarios",
      titleTable: "Infraestructura tecnológica",
      user: req.session.nombre,
      rol: req.session.rolUser,
    })
);

router.get(
  "/inventarios/infraestructura/computadoras",
  verificarSessionPage,
  (req, res) =>
    res.render("./equipos/computadoras", {
      title: "CONAGUA",
      titleSection: "Inventarios",
      titleTable: "Infraestructura tecnológica",
      user: req.session.nombre,
      rol: req.session.rolUser,
    })
);

router.get(
  "/inventarios/infraestructura/perifericos",
  verificarSessionPage,
  (req, res) =>
    res.render("./equipos/perifericos", {
      title: "CONAGUA",
      titleSection: "Inventarios",
      titleTable: "Infraestructura tecnológica",
      user: req.session.nombre,
      rol: req.session.rolUser,
    })
);

router.get("/inventarios/resguardos", verificarSessionPage, (req, res) =>
  res.render("./equipos/resguardos", {
    title: "CONAGUA | Resguardo de documento",
    titleSection: "Resguardo de documentos",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/reportes", verificarSessionPage, (req, res) =>
  res.render("./monitoreo/reportes", {
    title: "CONAGUA | Reportes",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/reportar", (req, res) =>
  res.render("./monitoreo/reportar", {
    title: "CONAGUA | Reportar",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/generar", verificarSessionPage, (req, res) =>
  res.render("./documentos/index", {
    title: "CONAGUA | Generar Doc",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/generar/doc-preparados", verificarSessionPage, (req, res) =>
  res.render("./documentos/generar", {
    title: "CONAGUA | Documentos preparados",
    titleSection: "Generar documentos",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/generar/crear", verificarSessionPage, (req, res) =>
  res.render("./documentos/crear", {
    title: "CONAGUA | Crear documento",
    titleSection: "Crear documentos",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/generar/subir", verificarSessionPage, (req, res) =>
  res.render("./documentos/subir", {
    title: "CONAGUA | Subir documento",
    titleSection: "subir documentos",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/chat", verificarSessionPage, (req, res) =>
  res.render("./chats/chat", {
    title: "CONAGUA | Chat",
    titleSection: "Chat interno",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/historial", verificarSessionPage, (req, res) =>
  res.render("./history/bitacora", {
    title: "CONAGUA | Bitacora",
    titleSection: "Historial de cambios",
    user: req.session.nombre,
    rol: req.session.rolUser,
  })
);

router.get("/configuracion", verificarSessionPage, (req, res) =>
  res.render("./admin/config", {
    title: "CONAGUA | Configuración",
    titleSection: "Configuración",
    user: req.session.nombre,
    rol: req.session.rolUser,
    email: req.session.user,
  })
);

export default router;
