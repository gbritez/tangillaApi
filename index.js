const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors({
    origin: 'http://localhost:3001'
}))
app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

app.post('/post', (req, res) => {

})

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});