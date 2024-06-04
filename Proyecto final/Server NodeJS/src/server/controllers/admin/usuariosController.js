import axiosRequest from "../../helpers/axios.js";

const getUsuarios = async () => {
  try {
    const { getUsersChange } = await axiosRequest({
      query: `query { getUsersChange {id correo nombre rol_id} }`,
    });

    return getUsersChange;
  } catch (error) {
    throw "Error al obtener los usuarios";
  }
};

const deleteUsuario = async (uuid) => {
  try {
    await axiosRequest({
      query: `mutation { deleteUser(uuid: "${uuid}") {id} }`,
    });
    return "Usuario eliminado con éxito";
  } catch (error) {
    throw "Error al eliminar el usuario";
  }
};

export default {
  getUsuarios,
  deleteUsuario,
};
