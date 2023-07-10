const { authenticate } = require("../config/jwt.config");
const { createPredio, getOnePredio, deletePredio, getAllPredios, updatePredio} = require("../controller/predio.controller");


module.exports = app => {
    app.get("/api/predios", authenticate, getAllPredios);
    app.post("/api/predios/new", authenticate, createPredio);
    app.get("/api/predios/:id", authenticate, getOnePredio);
    app.delete("/api/predios/:id", authenticate, deletePredio);
    app.put("/api/predios/:id", authenticate, updatePredio);
}
// Compare this snippet from server/models/project.model.js:


