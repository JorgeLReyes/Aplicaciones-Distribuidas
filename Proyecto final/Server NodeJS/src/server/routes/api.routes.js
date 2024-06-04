import { Router } from "express";
import googleController from "../controllers/googleAPI/googleController.js";
import documentosController from "../controllers/documentos/documentosController.js";
import { login } from "../controllers/loginController.js";
import users from "../controllers/registerController.js";
import rolesController from "../controllers/admin/rolesController.js";
import passwordController from "../controllers/admin/passwordController.js";
import usernameController from "../controllers/admin/usernameController.js";
import usuariosController from "../controllers/admin/usuariosController.js";

const api = Router();

api.post("/api/login", login);
api.get("/api/register", users.getUsers);
api.post("/api/register", users.registerUser);
api.put("/api/register", users.acceptUser);
api.delete("/api/register", users.rejectUser);

api.post("/destruir-sesion", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error al destruir la sesión" });
    } else {
      res.status(200).json({ location: "/" });
    }
  });
});

api.post("/roles", async (req, res) => {
  const roles = await rolesController.getRoles();
  res.json(roles);
});

api.put(
  "/up-file",
  documentosController.upload.single("documento"),
  async (req, res) => {
    const url = documentosController.saveFile(req.file);
    googleController
      .uploadFile(url)
      .then((fileId) => res.json({ error: null, id: fileId }))
      .catch(() =>
        res.status(401).json({ error: "Error al subir el documento" })
      );
  }
);

api.post("/descargar-archivo", async (req, res) => {
  try {
    const { fileUrl } = req.body;
    console.log(fileUrl);
    const response = await googleController.downloadAndSaveFile(fileUrl);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=generate.pdf",
    });

    // const fileUrl =
    //   "https://drive.google.com/file/d/1A2qP-iAaziK0dh7AshlCHe3kTimHwfXJ/view?usp=drivesdk";
    response.pipe(res);
  } catch (error) {
    res.status(500).send("Error al descargar y guardar el archivo");
  }
});

api.put("/update-password", async (req, res) => {
  try {
    const email = req.session.user;
    const oldPassword = req.body.oldPassword;
    const uuid = req.session._id;
    const newPassword = req.body.newPassword;

    console.log(email, oldPassword, uuid, newPassword);
    if (!email) throw "Error falta email";
    if (!oldPassword) throw "Error falta contraseña actual";
    if (!uuid) throw "Error falta id";
    if (!newPassword) throw "Error falta contraseña nueva";
    await passwordController.changePassword({
      uuid,
      email,
      oldPassword,
      newPassword,
    });

    res.json({ data: "Contraseña cambiada con éxito", error: null });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error || "Error al cambiar la contraseña" });
  }
});

api.post("/reset-password", async (req, res) => {
  try {
    if (req.session.rolUser !== "superAdmin")
      throw "No tienes los permisos suficientes";

    const uuid = req.body.id;
    const newPassword = req.body.newPassword;

    console.log(uuid, newPassword);
    if (!uuid) throw "Error falta id";
    if (!newPassword) throw "Error falta contraseña nueva";

    await passwordController.resetUserPassword({
      uuid,
      newPassword,
    });

    res.json({ data: "Contraseña cambiada con éxito", error: null });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error || "Error al cambiar la contraseña" });
  }
});

api.post("/update-username", async (req, res) => {
  try {
    console.log(req.body);
    const newUsername = req.body.newName;
    const uuid = req.session._id;
    const data = await usernameController.changeUserName({
      id: uuid,
      newUsername,
    });
    req.session.nombre = data.nombre;
    res.json({ data: "Nombre de usuario actualizado con éxito", error: null });
  } catch (error) {
    res.status(401).json({ error: error || "Error de servidor" });
  }
});

api.post("/usuarios", async (req, res) => {
  try {
    const data = await usuariosController.getUsuarios();

    res.json(data);
  } catch (error) {
    res.status(401).json({ error: "Error al obtener los usuarios" });
  }
});

api.post("/update-rol", async (req, res) => {
  try {
    const id = req.body.id;
    const rol_id = req.body.rol_id;
    console.log(id, rol_id);

    const data = await rolesController.setRol({ id, rol_id });

    res.json({ data, error: null });
  } catch (error) {
    res.status(401).json({ error: "Error al actualizar el rol" });
  }
});

api.delete("/delete-user-system", async (req, res) => {
  try {
    console.log(req.body.uuid);
    const data = await usuariosController.deleteUsuario(req.body.uuid);

    res.json(data);
  } catch (error) {
    res.status(401).json({ error: "Error al eliminar el ususario" });
  }
});

export default api;
