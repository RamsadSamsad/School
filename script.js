const form = document.getElementById('query-form');
const sqlInput = document.getElementById('sql-input');
const resultTable = document.getElementById('result-table');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const sql = sqlInput.value.trim();
  if (sql) {
    fetch('/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql }),
    })
     .then((response) => response.json())
     .then((data) => {
        const table = document.createElement('table');
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach((header) => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
        data.forEach((row) => {
          const rowElement = document.createElement('tr');
          headers.forEach((header) => {
            const td = document.createElement('td');
            td.textContent = row[header];
            rowElement.appendChild(td);
          });
          table.appendChild(rowElement);
        });
        resultTable.innerHTML = '';
        resultTable.appendChild(table);
      })
     .catch((error) => console.error(error));
  }
});
