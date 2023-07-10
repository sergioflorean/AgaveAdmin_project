const { get } = require('mongoose');
const {register, login, logout, getOneUser, getAllUsers, deleteUser} = require('../controller/user.controllers');

module.exports = app => {
    app.post("/api/user/register", register);
    app.post("/api/user/login", login);
    app.post("/api/user/logout", logout);
    app.get("/api/user/:id", getOneUser);
    app.get("/api/user", getAllUsers);
    app.delete("/api/user/:id", deleteUser);
}

// Compare this snippet from server/routes/test.routes.js:
