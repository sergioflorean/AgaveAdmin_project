const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
    tipoproceso: {
        type: String,
        required: [true, 'Title is required'],
        enum: ['Foleo', 'Abono', 'Sello']
    },
    nombreproducto: {
        type: String,
        required: [true, 'Title is required'],
        enum: ['Fertilizante', 'Ktionic', 'Ultrasol', 'Raizal', 'Grofol', 'Bromax', 'Diler']
    },
    cantidad: {
        type: Number,
        required: [true, 'cantidad es requerida'],
    },




}, {timestamps: true});

const Producto = model('Producto', ProductoSchema);
module.exports = Producto;