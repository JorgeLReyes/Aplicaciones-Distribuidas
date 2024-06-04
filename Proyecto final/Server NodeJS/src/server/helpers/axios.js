import axios from "axios";

const axiosRequest = async (options) => {
  // url, options:{query, variables}
  const url = "https://server-graph-final.onrender.com/graphql";

  if (!options.variables) delete options.variables;

  try {
    const data = await axios.post(url, options);
    if (data.data.errors)
      throw data.data.errors[0].message
        .replace("Unexpected error value: ", "")
        .replace(/["]+/g, "");

    return data.data.data;
  } catch (error) {
    throw error;
  }
};

export default axiosRequest;
