const express = require("express");
const mongoose = require("mongoose");
const createRoute = require("./routes/create.route");
const evaluateRoute = require("./routes/evaluate.route");
const combineRoute = require("./routes/combine.rule");

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

app.use("/api/create-rule",createRoute);
app.use("/api/evaluate-rule",evaluateRoute);
app.use("/api/combine-rule",combineRoute);

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});