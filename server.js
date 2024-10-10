const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const productosRoutes = require('./src/Routes/productosRoutes')

const PORT = process.env.PORT  || 3000;

app.use(express.urlencoded({extended:true}))

app.use(cors());

app.use(express.json());

app.use('/api/productos', productosRoutes);

app.listen(PORT,() => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})

