const Predio = require('../models/predio.model');

module.exports.getAllPredios = async (req, res) => {
    try {
        
        const prediosList = await Predio.find();
        res.json({ predios: prediosList });



    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });

    }
}

module.exports.createPredio = async (req, res) => {
    try {
        //obtener ID de usuario
        const newPredio = await Predio.create(req.body);
        res.json({ predio: newPredio });
       
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido crear el predio",
            error
        });
    }
}

module.exports.getOnePredio = async (req, res) => {
    try {
        const onePredio = await Predio.findById(req.params.id);
        res.json({ predio: onePredio });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido encontrar el predio.",
            error
        });
    }
}

module.exports.deletePredio = async (req, res) => {
    try {
        const response = await Predio.deleteOne({ _id: req.params.id });
        res.json({ predio: response });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido eliminar el predio.",
            error
        });
    }
}


// CONTADOR ABONO, FOLEO Y SELLO
// Mapa para almacenar los contadores e intervalos de cada predio
const predioData = new Map();

// Función para cambiar el estado de un predio a 'Pendiente' y reiniciar el contador específico
const changeStatusToPending = async (predio, status) => {
    try {
        predio[status] = 'Pendiente';
        predio.contador = 0;
        await predio.save();
        console.log(`Estado ${status} del predio ${predio._id} cambiado a "Pendiente"`);
    } catch (error) {
        console.error(`Error al cambiar el estado ${status} del predio ${predio._id}:`, error);
    }
};

module.exports.updatePredio = async (req, res) => {
    try {
        const updatedPredio = await Predio.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Verificar si el estado del abono es 'Completado'
        if (updatedPredio.abonostatus === 'Completado') {
            // Verificar si el predio ya tiene un contador y un intervalo asociados solo para abonostatus
            if (!predioData.has(`${updatedPredio._id}_abono`)) {
                // Crear un contador y un intervalo solo para abonostatus
                let contadorAbono = 0;
                const intervalAbono = setInterval(async () => {
                    contadorAbono++;

                    // Verificar si han pasado 20 segundos (20 * 1000 milisegundos)
                    if (contadorAbono >= 30) {
                        clearInterval(intervalAbono); // Detener el intervalo

                        // Cambiar el estado del abono del predio a 'Pendiente' y reiniciar el contador
                        await changeStatusToPending(updatedPredio, 'abonostatus');

                       

                        // Eliminar el contador y el intervalo del mapa
                        predioData.delete(`${updatedPredio._id}_abono`);
                    } else {
                        console.log(`Contador de abonostatus del predio ${updatedPredio._id}: ${contadorAbono}`);
                    }
                }, 1000); // Intervalo de 1 segundo (1000 milisegundos)

                // Almacenar el contador y el intervalo solo para abonostatus en el mapa
                predioData.set(`${updatedPredio._id}_abono`, { contadorAbono, intervalAbono });
            }
        }

        // Verificar si el estado de foleostatus es 'Completado'
        if (updatedPredio.foleostatus === 'Completado') {
            // Verificar si el predio ya tiene un contador y un intervalo asociados solo para foleostatus
            if (!predioData.has(`${updatedPredio._id}_foleo`)) {
                // Crear un contador y un intervalo solo para foleostatus
                let contadorFoleo = 0;
                const intervalFoleo = setInterval(async () => {
                    contadorFoleo++;

                    // Verificar si han pasado 15 segundos (15 * 1000 milisegundos)
                    if (contadorFoleo >= 20) {
                        clearInterval(intervalFoleo); // Detener el intervalo

                        // Cambiar el estado de foleostatus del predio a 'Pendiente' y reiniciar el contador
                        await changeStatusToPending(updatedPredio, 'foleostatus');

                        // Eliminar el contador y el intervalo del mapa
                        predioData.delete(`${updatedPredio._id}_foleo`);
                    } else {
                        console.log(`Contador de foleostatus del predio ${updatedPredio._id}: ${contadorFoleo}`);
                    }
                }, 1000); // Intervalo de 1 segundo (1000 milisegundos)

                // Almacenar el contador y el intervalo solo para foleostatus en el mapa
                predioData.set(`${updatedPredio._id}_foleo`, { contadorFoleo, intervalFoleo });
            }
        }

        // Verificar si el estado de sellostatus es 'Completado'
        if (updatedPredio.sellostatus === 'Completado') {
            // Verificar si el predio ya tiene un contador y un intervalo asociados solo para sellostatus
            if (!predioData.has(`${updatedPredio._id}_sello`)) {
                // Crear un contador y un intervalo solo para sellostatus
                let contadorSello = 0;
                const intervalSello = setInterval(async () => {
                    contadorSello++;

                    // Verificar si han pasado 20 segundos (20 * 1000 milisegundos)
                    if (contadorSello >= 25) {
                        clearInterval(intervalSello); // Detener el intervalo

                        // Cambiar el estado de sellostatus del predio a 'Pendiente' y reiniciar el contador
                        await changeStatusToPending(updatedPredio, 'sellostatus');

                        // Eliminar el contador y el intervalo del mapa
                        predioData.delete(`${updatedPredio._id}_sello`);
                    } else {
                        console.log(`Contador de sellostatus del predio ${updatedPredio._id}: ${contadorSello}`);
                    }
                }, 1000); // Intervalo de 1 segundo (1000 milisegundos)

                // Almacenar el contador y el intervalo solo para sellostatus en el mapa
                predioData.set(`${updatedPredio._id}_sello`, { contadorSello, intervalSello });
            }
        }

        res.json({ predio: updatedPredio });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, no hemos podido actualizar el predio.",
            error,
        });
    }
};
