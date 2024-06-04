import axios from "axios";
import axiosRequest from "../helpers/axios.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.credentials;

    const { getLogin } = await axiosRequest({
      query: `query getLogin($email: String!, $password: String!) {
        getLogin(email: $email, password: $password) { id email role }
      }`,
      variables: {
        email: email,
        password: password,
      },
    });

    const { id, email: correo, role } = getLogin;

    const { getUser } = await axiosRequest({
      query: `query getUser($id: ID!) {
        getUser(id: $id) { id correo nombre rol_id roles }
      }`,
      variables: { id },
    });

    const { nombre, roles } = getUser;

    req.session._id = id;
    req.session.user = correo;
    req.session.role = role;
    req.session.nombre = nombre;
    req.session.rolUser = roles;

    let ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
    ip = ip.replace(/\:\:(.*)\:/gi, "");

    req.session.ip = ip;

    res.status(200).json({ location: "/chat" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
