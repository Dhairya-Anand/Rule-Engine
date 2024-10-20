const express = require("express");
const mongoose = require("mongoose");
const createRoute = require("./routes/create.route");
const evaluateController = require("./controllers/evaluate.controller");

const PORT = 3000;

try{
    mongoose.connect("mongodb+srv://dhairya0431be21:20021118@cluster431.zughpzb.mongodb.net/Rule_Engine?retryWrites=true&w=majority");
    console.log("MongoDB connected");
}
catch(error){
    console.log("Error in mongodb connection", error.message);
}

const app = express();

app.use(express.json());

app.use("/create-rule",createRoute);
app.use("/evaluate-rule",evaluateController);

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});