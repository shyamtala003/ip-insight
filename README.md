# ip-insight

`ip-insight` is a utility for fetching IP geo-location details, including country, city, timezone, currency, and more.

## Installation

```bash
npm install ip-insight
```

## Usage

#### Input: Request Object (`req`)

The `ip-insight` utility expects a Node.js `req` object (commonly available in frameworks like Express.js). It uses the `x-forwarded-for` header or the `remoteAddress` property to determine the client IP address.

The `req` object should have the following structure:

1. `req.headers`: Contains the `x-forwarded-for` header, which may include the client's IP address (especially useful behind proxies or load balancers).
2. `req.socket`: Contains the `remoteAddress` property, which is the IP address of the direct connection.

### How to Use

Here’s an example of how to use `ip-insight`:

```javascript
const getIpDetails = require("ip-insight");

// Example Express.js route
app.get("/api/ip-details", (req, res) => {
  const details = getIpDetails(req);
  res.json(details);
});
```

## Response Format

```json
"ip": "2405:201:2024:a801:c19a:3cfc:8f08:1df5",
"is_eu": "0",
"city": "Surat",
"region": "GJ",
"region_code": "GJ",
"region_type": "",
"country_code": "IN",
"country_name": "India",
"capital": "New Delhi",
"currency": "INR",
"iso": "IND",
"latitude": 21.1888,
"longitude": 72.8293,
"timezone": "Asia/Kolkata",
"currentTime": "17:59:33"
```

## Features

- **IP Geolocation:** Identify the country, city, and region of an IP address.
- **Country Details:** Includes country name, capital, currency, and ISO codes.
- **Timezone Detection:** Fetches the timezone and calculates the current time in the specified timezone.
- **EU Status:** Determines whether the IP belongs to the European Union.
- **Customizable Data:** Easily extend or modify the country-specific JSON files for additional details.
- **Supports IPv4 and IPv6:** Works seamlessly with both IPv4 and IPv6 addresses

## Notes

- The package uses the geoip-lite library for IP geolocation. Ensure your application environment allows real IP addresses for accurate results.
- For local testing (localhost or 127.0.0.1), the package replaces the IP with a public IP example.

## Contributing

Feel free to fork the repository, make changes, and open a pull request. Contributions are welcome!
