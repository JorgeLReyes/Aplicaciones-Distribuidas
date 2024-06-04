const TableBody = ({ data, id }) => {
  const tbody = document.createElement("tbody");

  if (!data.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.classList.add("no-data");
    td.textContent = "No hay datos para mostrar";
    td.colSpan = 100;
    tr.insertAdjacentElement("beforeend", td);
    tbody.insertAdjacentElement("beforeend", tr);
  }

  data.forEach((el) => {
    const tr = document.createElement("tr");

    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "id");

    for (const key in el) {
      const td = document.createElement("td");
      if (key === "id" || key === id) check.dataset.id = el[key];
      td.textContent = el[key];
      tr.insertAdjacentElement("beforeend", td);
    }

    const tdCheck = document.createElement("td");
    tdCheck.append(check);
    tr.insertAdjacentElement("afterbegin", tdCheck);
    tbody.insertAdjacentElement("beforeend", tr);
  });
  return tbody;
};

export default TableBody;
