const Loader = () => {
  const div = document.createElement("div");
  div.classList.add("flex", "loader");

  div.innerHTML = `<img src = "/img/spinner.svg" alt = "loader">`;

  return div;
};

export default Loader;
