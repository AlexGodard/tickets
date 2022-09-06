const express = require('express');
const { sum } = require('lodash');

const app = express();
const port = process.env.PORT || 8080;

const headers = {
  "accept": "application/json",
  "accept-language": "en,fr;q=0.9",
  "content-type": "application/json-rpc",
  "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Linux\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "Referer": "https://billets.cfmontreal.com/cfm/",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}

app.get('/', async function(req, res) {
  const response = await fetch("https://billets.cfmontreal.com/info//showshop.eventInventory3?params=83fdfbfe-e1a0-4891-ba08-9a86845dc276_CFM2215IND_[object%20Object]", {
    "headers": headers,
    "body": "{\"jsonrpc\":\"2.0\",\"method\":\"showshop.eventInventory3\",\"params\":[\"83fdfbfe-e1a0-4891-ba08-9a86845dc276\",\"CFM2215IND\",{\"groupByPriceLevel\":true,\"groupByRestriction\":true,\"includeKilledSeats\":true}],\"id\":1}",
    "method": "POST"
  });
  const data = await response.json()
  const ticketsLeft9Sept = data.result.primary["SSOps-imp"].seats["16"].length
  const response2 = await fetch("https://billets.cfmontreal.com/info//showshop.eventInventory3?params=83fdfbfe-e1a0-4891-ba08-9a86845dc276_CFM2216IND_[object%20Object]", {
    "headers": headers,
    "body": "{\"jsonrpc\":\"2.0\",\"method\":\"showshop.eventInventory3\",\"params\":[\"83fdfbfe-e1a0-4891-ba08-9a86845dc276\",\"CFM2216IND\",{\"groupByPriceLevel\":true,\"groupByRestriction\":true,\"includeKilledSeats\":true}],\"id\":1}",
    "method": "POST"
  });
  const data2 = await response2.json()
  const ticketsLeft13Sept = data2.result.primary["SSOps-imp"].seats["16"].length
  const response3 = await fetch("https://billets.cfmontreal.com/info//showshop.eventInventory3?params=8b3ffd71-436c-49c5-9d1a-1ef8b167f959_CFM2215IND_[object%20Object]", {
    "headers": headers,
    "body": "{\"jsonrpc\":\"2.0\",\"method\":\"showshop.eventInventory3\",\"params\":[\"8b3ffd71-436c-49c5-9d1a-1ef8b167f959\",\"CFM2215IND\",{\"groupByPriceLevel\":true,\"groupByRestriction\":true,\"includeKilledSeats\":true}],\"id\":1}",
    "method": "POST"
  });
  const data3 = await response3.json()
  const response4 = await fetch("https://billets.cfmontreal.com/info//showshop.eventInventory3?params=8b3ffd71-436c-49c5-9d1a-1ef8b167f959_CFM2216IND_[object%20Object]", {
    "headers": headers,
    "body": "{\"jsonrpc\":\"2.0\",\"method\":\"showshop.eventInventory3\",\"params\":[\"8b3ffd71-436c-49c5-9d1a-1ef8b167f959\",\"CFM2216IND\",{\"groupByPriceLevel\":true,\"groupByRestriction\":true,\"includeKilledSeats\":true}],\"id\":1}",
    "method": "POST"
  });
  const data4 = await response4.json()
  const totalTicketsLeft9Sept = sum(Object.values(data3.result.primary['Unrestricted-imp']['GASeats']).flatMap(section => Object.values(section))) + sum(Object.values(data3.result.primary['Unrestricted-imp'].seats).flatMap(section => section.length)) + ticketsLeft9Sept
  const totalTicketsLeft13Sept = sum(Object.values(data4.result.primary['Unrestricted-imp']['GASeats']).flatMap(section => Object.values(section))) + sum(Object.values(data4.result.primary['Unrestricted-imp'].seats).flatMap(section => section.length)) + ticketsLeft13Sept

  res.send(`<div>9 Sept (132 AG): ${166 - ticketsLeft9Sept} billets vendus sur 166 (${ticketsLeft9Sept} restants)</div>
                 <div>9 Sept (Stade entier): ${(19619 - totalTicketsLeft9Sept).toLocaleString()} billets vendus sur 19,619 (${totalTicketsLeft9Sept.toLocaleString()} restants)</div></br>
<div>13 Sept (132 AG): ${166 - ticketsLeft13Sept} billets vendus sur 166 (${ticketsLeft13Sept} restants)</div><div>13 Sept (Stade entier): ${(19619 - totalTicketsLeft13Sept).toLocaleString()} billets vendus sur 19,619 (${totalTicketsLeft13Sept.toLocaleString()} restants)</div>`);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
