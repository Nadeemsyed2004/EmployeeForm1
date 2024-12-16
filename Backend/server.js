const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/db.js');
const addEmp = require('./Controller/auth.js');

require('dotenv').config();
db();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("success");
});

app.use('/api/auth',addEmp);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
});
