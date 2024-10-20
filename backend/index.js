const express = require("express");
const createRoute = require("./routes/create.route");

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/create-rule",createRoute);

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});