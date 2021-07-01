# OVH DDoS Alerts
Checks the OVH API to see if an IP address is in forced mitigation mode and sends Discord alerts.

## About
- Made by Courvix for the Courvix Network
- Instagram: courvixnetwork
- Email: contact@courvix.com    
- GitHub: Courvix
- GitLab: Courvix

## Requirements:
- [phin](https://www.npmjs.com/package/phin) - used for as a http lib to send request to discord webhook
- [chalk](https://www.npmjs.com/package/chalk) - used for easier text colors lol
- [ovh](https://www.npmjs.com/package/ovh) - ovh's own lib for their api functions, includes auto json parsing
- [net](https://nodejs.org/api/net.html#net_net) - for ip validation

```
npm i phin
npm i chalk
npm i ovh
```

## How to Use:

1. Install the requirements mentioned above
2. Generate OVH API tokens with their pages
   - https://eu.api.ovh.com/createToken/ - for EU region
   - https://ca.api.ovh.com/createToken/ - for CA region
   - https://api.ovh.com/createToken/ - for US region
3. Use the keys generated and configure them below where it says endpoint, appKey, appSecret, consumerKey
4. Customize anything else
5. Run the checker
