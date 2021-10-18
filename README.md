# OVH DDoS Alerts
Checks the OVH API to see if an IP address is in forced mitigation mode and sends Discord alerts.

P.S. This is the first thing that I wrote in NodeJS - improvements to the code via pull requests are encouraged.

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

Or just ```npm i``` to install all the dependencies in package.json

## How to Use:

1. Install the requirements mentioned above
2. Generate OVH API tokens with their pages
   - https://eu.api.ovh.com/createToken/ - for EU region
   - https://ca.api.ovh.com/createToken/ - for CA region
   - https://api.ovh.com/createToken/ - for US region

You'll want to grant a GET request to the following OVH API URL: ```/ip/{ipBlock}/mitigation/{ipAddr}```. If you
are checking an IP address belonging to a failover IP block purchased from OVH, then you'll want to specify
the ipBlock as something like 198.98.0.0/24 for example. If you're checking a single regular IP address,
then both ipBlock and ipAddr can be the same (your server's IP address.)

Further documentation on the ```/ip/{ipBlock}/mitigation/{ipAddr}``` API endpoint can be found on OVH's API
documentation page here: https://api.ovh.com/console/#/ip/{ip}/mitigation/{ipOnMitigation}#GET

3. Use the keys generated and configure them in config.json where it says **appKey**, **appSecret**, and **consumerKey**
4. Customize anything else
5. Run the checker

*NOTE*

When running the checker, remember about ipBlock and ipAddr. If you're checking a regular single IP address,
you'll need to specify that IP as both the IP Block and IP Address, whereas a failover IP block will be like
node checker 192.98.0.0/24 192.98.0.30.
