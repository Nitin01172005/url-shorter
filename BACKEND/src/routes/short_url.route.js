import express from "express";
import { createshortUrl } from "../controller/short_url.controller.js";
const  router = express.Router();

router.post("/", createshortUrl )


export default router;