const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/projetct_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log("established connection to database"))
    .catch(err => console.log("something went wrong ", err));


