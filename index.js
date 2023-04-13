const controller = require('./controller')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.post('/post', controller)

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});