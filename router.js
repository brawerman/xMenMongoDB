const express = require("express");
const router = express.Router();
const xMenController = require("./src/Controllers/xMenController");

router.get("/", (req, res) => {
	res.send("It's working");
});

router.post("/newXMen", xMenController.newXMen);
router.get("/findAllXMen", xMenController.findAllXMen);
router.get("/findXMenById/:_id", xMenController.findXMenById);
router.post("/findXMenByName", xMenController.findXMenByName);
router.delete("/deleteXMen/:_id", xMenController.deleteXMen);
router.patch("/updateXMen", xMenController.updateXMen);

module.exports = router;
