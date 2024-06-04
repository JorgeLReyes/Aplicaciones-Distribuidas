import axiosRequest from "../helpers/axios.js";

const getUsers = async (req, res) => {
  try {
    const { getUsersAccept } = await axiosRequest({
      query: "query { getUsersAccept {id email nombre} }",
    });

    return res.status(200).json(getUsersAccept);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { createUserAccept } = await axiosRequest({
      query: `
      mutation createUserAccept($input: UserAccept!) {
        createUserAccept(input: $input) {
          id email password nombre
        }
      }`,
      variables: {
        input: req.body.credentials,
      },
    });

    return res.status(200).json(createUserAccept);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const acceptUser = async (req, res) => {
  try {
    const { id, rol } = req.body;

    await axiosRequest({
      query: `mutation { createUser(id: "${id}", rol: "${rol}") { id } }`,
    });

    await axiosRequest({
      query: `mutation { deleteUsersAccept(id: "${id}") { id } }`,
    });

    return res.status(200).json({ mensaje: "Usuario aceptado con exito" });
  } catch (error) {
    return res.json({ error: "El usuario ya ha sido registrado" });
  }
};

const rejectUser = async (req, res) => {
  try {
    await axiosRequest({
      query: `mutation { deleteUsersAccept(id: "${req.body.id}") { id } }`,
    });

    return res.status(200).json({
      mensaje: "Dato eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getUsers,
  registerUser,
  acceptUser,
  rejectUser,
};
