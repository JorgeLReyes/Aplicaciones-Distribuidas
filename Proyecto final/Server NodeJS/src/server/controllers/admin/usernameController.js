import axiosRequest from "../../helpers/axios.js";

const changeUserName = async ({ id, newUsername }) => {
  try {
    const { updateUsername } = await axiosRequest({
      query: `mutation 
      { updateUsername
        (id: "${id}",
         newUsername: "${newUsername}")
         {nombre}
      }`,
    });
    return updateUsername;
  } catch (error) {
    throw error;
  }
};

export default {
  changeUserName,
};
