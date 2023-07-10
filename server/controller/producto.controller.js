const Producto = require('../models/producto.model');

module.exports.getAllProductos = async (req, res) => {
    try {
        const productosList = await Producto.find();
        res.json({ productos: productosList });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });

    }
}

module.exports.createProducto = async (req, res) => {
    try {
        const newProducto = await Producto.create(req.body);
        res.json({ producto: newProducto });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido crear el producto",
            error
        });
    }
}

module.exports.getOneProducto = async (req, res) => {
    try {
        const oneProducto = await Producto.findById(req.params.id);
        res.json({ producto: oneProducto });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido encontrar el producto.",
            error
        });
    }
}

module.exports.deleteProducto = async (req, res) => {
    try {
        const response = await Producto.deleteOne({ _id: req.params.id });
        res.json({ producto: response });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido eliminar el producto.",
            error
        });
    }
}

module.exports.updateProducto = async (req, res) => {
    try {
        const response = await Producto.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json({ producto: response });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido actualizar el producto.",
            error
        });
    }
}

