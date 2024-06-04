import axiosRequest from "../../helpers/axios.js";

const getRoles = async () => {
  try {
    let { getRole } = await axiosRequest({
      query: "query { getRole {id rol} }",
    });

    const role = getRole.map((e) => {
      const obj = {};
      obj.id = e.id;
      obj.value = e.rol;
      return obj;
    });

    return role;
  } catch (error) {
    return error;
  }
};

const setRol = async ({ id, rol_id }) => {
  try {
    let { updateRole } = await axiosRequest({
      query: `mutation { updateRole(id: "${id}", rol: ${rol_id}) {id} }`,
    });

    return updateRole;
  } catch (error) {
    // console.error("Error updating role:", error);
    throw error;
  }
};

export default { getRoles, setRol };
