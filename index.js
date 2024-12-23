const express = require("express");
const geoip = require("geoip-lite");
const countryName = require("./json/name.json");
const capital = require("./json/capital.json");
const currency = require("./json/currency.json");
const iso = require("./json/iso.json");
const getCurrentTimeInTimezone = require("./util/getTimeByTimezone");

const app = express();
const port = 3000;

app.get("/api/ip-details", (req, res) => {
  let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(clientIp);

  // Map loopback IPs to a public IP for testing
  if (clientIp === "::1" || clientIp === "127.0.0.1") {
    clientIp = "122.175.95.114"; // Example public IP
  } else {
    clientIp = clientIp.split(",")[0];
  }

  const geoData = geoip.lookup(clientIp);
  console.log(geoData);

  if (geoData) {
    const ipDetails = {
      ip: clientIp,
      is_eu: geoData.eu || false,
      city: geoData.city || "Unknown",
      region: geoData.region || "Unknown",
      region_code: geoData.region || "Unknown",
      region_type: "",
      country_code: geoData.country || "Unknown",
      country_name: geoData.country ? countryName[geoData.country] : "Unknown",
      capital: geoData.country ? capital[geoData.country] : "Unknown",
      currency: geoData.country ? currency[geoData.country] : "Unknown",
      iso: geoData.country ? iso[geoData.country] : "Unknown",
      latitude: geoData.ll ? geoData.ll[0] : null,
      longitude: geoData.ll ? geoData.ll[1] : null,
      timezone: geoData.timezone,
      currentTime: geoData.timezone
        ? getCurrentTimeInTimezone(geoData.timezone)
        : "unknown",
    };
    res.json(ipDetails);
  } else {
    res.status(404).json({ error: "IP geolocation data not found." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
