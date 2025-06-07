import { getShortUrl } from "../dao/short_url.js";
import { createshortUrlWithoutService } from "../services/short_url.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createshortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createshortUrlWithoutService(url);

  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) {
    throw new Error("Short Url not found");
  }
  res.redirect(url.full_url);
});
