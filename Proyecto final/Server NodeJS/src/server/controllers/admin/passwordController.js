import axiosRequest from "../../helpers/axios.js";

const resetUserPassword = async ({ uuid, newPassword }) => {
  try {
    const { resetPassword } = await axiosRequest({
      query: `mutation 
      { resetPassword
        (uuid: "${uuid}",
         newPassword: "${newPassword}")
         {id}
      }`,
    });
    return resetPassword;
  } catch (error) {
    throw error;
  }
};

const changePassword = async ({
  uuid,
  email: mail,
  oldPassword,
  newPassword,
}) => {
  try {
    const { updatePassword } = await axiosRequest({
      query: `mutation 
      { updatePassword
        (uuid: "${uuid}",
         mail: "${mail}",
         oldPassword: "${oldPassword}",
         newPassword: "${newPassword}")
         {id}
      }`,
    });
    return updatePassword;
  } catch (error) {
    throw error;
  }
};

export default { resetUserPassword, changePassword };
