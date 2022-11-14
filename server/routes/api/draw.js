const express = require("express");
const router = express.Router();
const Draw = require("../../models/Draw");


router.post("/addupdate", async(req, res) => {
	let {no, date, thirdPrice, secondPrice, firstPrice, time, _id}= req.body
	if(!no || !date || !thirdPrice || !secondPrice || !firstPrice || !time){
		res.json({error:'All fields required'})
	}
	date= new Date(date)
	if(_id){
		let draw = await Draw.findByIdAndUpdate(
			_id,
			{no, date, thirdPrice, secondPrice, firstPrice, time})
			res.json({draw,update:true})
	}else{
		let draw = await new Draw({no, date, thirdPrice, secondPrice, firstPrice, time})
		await draw.save()
		res.json({draw,update:false})
	}
});

router.get("/delete/:id", async (req, res) => {
  let draws = await Draw.findByIdAndDelete(req.params.id)
	res.json({success:true})
});

router.get("/get", async (req, res) => {
  let draws = !req.query.date ? await Draw.find({}) : await Draw.find({date:req.query.date})
	res.json(draws)
});

router.get("/user/get", async (req, res) => {
	let date=req.query.date || new Date(new Date().setHours(0,0,0,0))
  let draws = await Draw.find({date}).sort({date: -1,updatedAt: -1})
	res.json(draws)
});

router.get("/user/last", async (req, res) => {
  let draws = await Draw.find({}).sort({date: -1,updatedAt: -1})
  .limit(4)
	res.json(draws)
});

module.exports = router;
