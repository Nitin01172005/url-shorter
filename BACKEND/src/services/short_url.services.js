import { generateNanoId } from "../utils/helper.js";

import { saveShortUrl } from "../dao/short_url.js";

export const createshortUrlWithoutService = async (url) => {
  const shortUrl = generateNanoId(7);
  if (shortUrl) throw new Error("Short url is not generated")

    await saveShortUrl(shortUrl, url);
    return shortUrl
}


export const createshortUrlWithtService = async (url, userId) => {
    const shortUrl = generateNanoId(7);
    await saveShortUrl(url, shortUrl, userId)
    return shortUrl
}