const mongoose = require("mongoose");
const xMenModel = require("../Models/xMenModel");

const XMen = mongoose.model("XMen", xMenModel);

module.exports = {
	async newXMen(req, res) {
		try {
			const { name, nick, isXMen, powers } = req.body;
			const xMen = new XMen({ name, nick, isXMen, powers });
			if (!(await xMen.save()))
				return res
					.status(400)
					.json({ msg: "Não foi possível criar personagem" });
			return res.json({ msg: "Personagem criado com sucesso." });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
	async findAllXMen(req, res) {
		try {
			const XMenList = await XMen.find();
			if (!XMenList || XMenList.length === 0)
				return res.status(404).json({ msg: "Não há XMen cadastrados." });
			else return res.json({ msg: "Lista de XMen cadastrados.", XMenList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
	async findXMenById(req, res) {
		try {
			const _id = req.params;
			const XMenChar = await XMen.findById(_id);
			if (!XMenChar || XMenChar.length === 0)
				return res.status(404).json({ msg: "XMen não encontrado." });
			else return res.json({ msg: "XMen encontrado", XMenChar });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
	async findXMenByName(req, res) {
		try {
			const name = req.body.name;
			const XMenList = await XMen.find({
				name: { $regex: name, $options: "i" },
			}).sort({ name: 1 });

			if (!XMenList || XMenList.length === 0)
				return res.status(404).json({ msg: "XMen não encontrado." });
			else return res.json({ msg: "XMen encontrado", XMenList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
	async deleteXMen(req, res) {
		try {
			const _id = req.params;
			const XMenChar = await XMen.findByIdAndDelete(_id);
			if (!XMenChar || XMenChar.length === 0)
				return res.status(404).json({ msg: "XMen não encontrado." });
			else return res.json({ msg: "XMen excluído", XMenChar });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
	async updateXMen(req, res) {
		try {
			const _id = req.params;
			const { name, nick, isXMen, powers } = req.body;
			const XMenChar = await XMen.findByIdAndUpdate(
				_id,
				{
					name,
					nick,
					isXMen,
					powers,
				},
				{ new: true }
			);
			if (!XMenChar || XMenChar.length === 0)
				return res.status(404).json({ msg: "XMen não encontrado." });
			else return res.json({ msg: "XMen atualizado", XMenChar });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
};
