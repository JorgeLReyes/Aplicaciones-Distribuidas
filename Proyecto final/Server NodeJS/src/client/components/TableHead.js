const TableHead = (data) => {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const el of data) {
    const th = document.createElement("th");
    th.innerHTML = el
      ? el
      : `<ion-icon name="checkbox-outline" style="color:var(--color-blue);top: .2rem;"></ion-icon>`;

    tr.append(th);
  }
  thead.append(tr);
  return thead;
};

export default TableHead;
