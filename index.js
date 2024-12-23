const geoip = require("geoip-lite");
const countryName = require("./json/name.json");
const capital = require("./json/capital.json");
const currency = require("./json/currency.json");
const iso = require("./json/iso.json");
const getCurrentTimeInTimezone = require("./util/getTimeByTimezone");

function getIpDetails(req) {
  let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Handle loopback IPs for local testing
  if (clientIp === "::1" || clientIp === "127.0.0.1") {
    clientIp = "122.175.95.114"; // Example public IP
  } else {
    clientIp = clientIp.split(",")[0];
  }

  const geoData = geoip.lookup(clientIp);

  if (!geoData) {
    return { error: "IP geolocation data not found." };
  }

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
    timezone: geoData.timezone || "Unknown",
    currentTime: geoData.timezone
      ? getCurrentTimeInTimezone(geoData.timezone)
      : "Unknown",
  };

  return ipDetails;
}

module.exports = getIpDetails;
