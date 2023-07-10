const {getAllProductos, createProducto, getOneProducto, deleteProducto, updateProducto} = require('../controller/producto.controller');
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.get("/api/productos",/* authenticate, */ getAllProductos);
    app.post("/api/productos/new", /* authenticate,  */createProducto);
    app.get("/api/productos/:id", /* authenticate, */ getOneProducto);
    app.delete("/api/productos/:id",/*  authenticate, */ deleteProducto);
    app.put("/api/productos/:id", /* authenticate, */ updateProducto);
}