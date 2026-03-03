const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const API_KEY = "AIzaSyB0_NQ3ml5YW_egLYeZTfYkni6m3VstVq4"; 

app.get("/analyze", async (req, res) => {
  let url = req.query.url;
  const strategy = req.query.strategy || "mobile"; 

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  try {
    const apiURL =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
      `?url=${url}` +
      `&strategy=${strategy}` +
      `&category=performance` +
      `&category=seo` +
      `&category=accessibility` +
      `&key=${API_KEY}`;

    const response = await axios.get(apiURL);
    const lighthouse = response.data.lighthouseResult;
res.json({
  website: url,
  strategy,
  statusCode: 200,

      performance: Math.round(
        lighthouse.categories.performance.score * 100
      ),
      seo: Math.round(lighthouse.categories.seo.score * 100),
      accessibility: Math.round(
        lighthouse.categories.accessibility.score * 100
      ),

      // Core Web Vitals (SAFE)
      lcp: lighthouse.audits["largest-contentful-paint"]?.numericValue
        ? Number(
            (
              lighthouse.audits["largest-contentful-paint"].numericValue / 1000
            ).toFixed(2)
          )
        : null,

      cls:
        lighthouse.audits["cumulative-layout-shift"]?.numericValue ?? null,

      inp: lighthouse.audits["interaction-to-next-paint"]?.numericValue
        ? Math.round(
            lighthouse.audits["interaction-to-next-paint"].numericValue
          )
        : null,

      pageSizeKB: lighthouse.audits["total-byte-weight"]?.numericValue
        ? Number(
            (
              lighthouse.audits["total-byte-weight"].numericValue / 1024
            ).toFixed(2)
          )
        : null
    });
  } catch (error) {
    console.error("PageSpeed error:", error.message);
    res.status(500).json({ error: "PageSpeed API failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
