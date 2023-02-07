const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Sandri1981+.',
    database: 'event_managament',
    port: 3306
};

const connection = mysql.createConnection(mysqlConfig);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
