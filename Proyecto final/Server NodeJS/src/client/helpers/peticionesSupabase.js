const request = async (obj) => {
  const { method, url, data } = obj;
  if (!method) obj.method = "GET";
  if (!data) delete obj.data;
  console.log(method, url);
  try {
    const response = await axios(obj);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default request;
