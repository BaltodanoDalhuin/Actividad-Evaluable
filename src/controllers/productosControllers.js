const fs = require('fs');

const leerarchi = () => {
  const data = fs.readFileSync('data.json', 'utf8');
  return JSON.parse(data);
};

const escribirarchi = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
};


const generarId = (productos) => {
  return productos.length ? Math.max(productos.map(producto => producto.id)) + 1 : 1;
};

const getAllProductos = (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'error al leer' });
    }
    res.json(JSON.parse(data));
  });
};

const postAllProductos = (req, res) => {
  const nuevoProducto = { ...req.body, id: generarId(leerarchi()) }; // Asigna un nuevo ID

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'error al leer' });
    }
    let productos = JSON.parse(data);
    productos.push(nuevoProducto);

    fs.writeFile('data.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'error al escribir' });
      }
      res.json({ message: 'agregado exitosamente', producto: nuevoProducto });
    });
  });
};

const deleteAllProductos = (req, res) => {
  const idProducto = parseInt(req.params.id);

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo' });
    }

    let productos = JSON.parse(data);
    const productosFiltrados = productos.filter(producto => producto.id !== idProducto);

    if (productos.length === productosFiltrados.length) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    fs.writeFile('data.json', JSON.stringify(productosFiltrados, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al escribir el archivo' });
      }
      res.json({ message: 'Producto eliminado exitosamente' });
    });
  });
};


const updateProducto = (req, res) => {
  const idProducto = parseInt(req.params.id);
  const nuevosDatos = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo' });
    }

    let productos = JSON.parse(data);
    const index = productos.findIndex(producto => producto.id === idProducto);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productos[index] = { ...productos[index], ...nuevosDatos }; // Actualiza los datos del producto

    fs.writeFile('data.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al escribir el archivo' });
      }
      res.json({ message: 'Producto actualizado exitosamente', producto: productos[index] });
    });
  });
};

module.exports = { getAllProductos, postAllProductos, deleteAllProductos, updateProducto };