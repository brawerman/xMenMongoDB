const express = require("express");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const port = 3000;

//Realizar conexão com MongoDB
try {
	mongoose.connect("mongodb://localhost:27017/xmen", {
		useNewUrlParser: true, //Novo modelo de URL do MongoDB
		useUnifiedTopology: true,
		//Modo de monitoramento especial e conexão simples
	});
} catch (error) {
	console.log("Erro de conexão com MongoDB.");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
	console.log("Server is running at localhost: ", port);
});

module.exports = app;
