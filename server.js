const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const db = new sqlite3.Database('WG-Drama.sqbpro');

app.use(express.json());

app.post('/query', (req, res) => {
  const sql = req.body.sql;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error executing query' });
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
