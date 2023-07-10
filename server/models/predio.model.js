const { Schema, model } = require('mongoose');

const PredioSchema = new Schema({
    nombrepredio: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [2, 'Title must be at least 2 characters long']
    },
    cantidadhectareas: {
        type: Number,
        required: [true, 'cantidad es requerida'],
    },
    cantidadplantas: {
        type: Number,
        required: [true, 'cantidad es requerida'],
    },
    ubicacion: {
        type: String,
        required: [true, 'ubicacion es requerida'],
    },
    fechaplantacion: {
        type: Date,
        //required: [true, 'fecha es requerida'],
    },
    abonostatus: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['Pendiente', 'Enproceso', 'Completado']
    },
    foleostatus: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['Pendiente', 'Enproceso', 'Completado']
    },
    sellostatus: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['Pendiente', 'Enproceso', 'Completado']
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
  


}, { timestamps: true });





const Predio = model('Project', PredioSchema);
module.exports = Predio;