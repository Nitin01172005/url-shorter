import { getShortUrl } from "../dao/short_url.js";
import { createshortUrlWithoutService } from "../services/short_url.services.js";


export const createshortUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createshortUrlWithoutService(url);
  res.send(process.env.APP_URL + shortUrl)
};


export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id)
  if (url) {
    res.redirect(url.full_url);
  }
  else {
    res.status(404).send("NOT FOUND")
  }
}