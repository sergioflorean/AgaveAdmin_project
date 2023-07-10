const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./server/config/mongoose.config');
require('dotenv').config();
console.log(process.env.SECRET_KEY);

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

const routes = require('./server/routes/predio.routes');
require('./server/routes/user.routes')(app);
require('./server/routes/producto.routes')(app);
routes(app);

app.listen(port, () => console.log('we are running on port 8000'))