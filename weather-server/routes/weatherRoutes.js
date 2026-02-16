import express from "express";
import { getWeatherData, searchCityWeather } from "../services/weatherService.js";

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const data = await getWeatherData();
        res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Something went wrong"})
    }
});

router.get("/search",async(req,res)=>{
    const {city} = req.query;
    if(!city) return res.status(400).json({error:"City query parameter is required"});
    try{
        const data = await searchCityWeather(city);
        res.json(data);
    }catch(error){
        res.status(404).json({ error: error.message });
    }
});


export default router;