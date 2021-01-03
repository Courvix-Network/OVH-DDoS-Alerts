/* 
    About:

    Made by Courvix for the Courvix Network
    Twitter: 0x64c
    Instagram: courvixnetwork
    Email: contact@courvix.com
    GitHub: Courvix
    GitLab: Courvix

    Requirements:

    phin - npm i install phin - used for as a http lib to send request to discord webhook
    chalk - npm i install chalk - used for easier text colors lol
    ovh - npm i install ovh - ovh's own lib for their api functions, includes auto json parsing

    How to Use:

    1.) Install the requirements mentioned above
    2.) Generate OVH API tokens with their pages (
        https://eu.api.ovh.com/createToken/ - for EU region
        https://ca.api.ovh.com/createToken/ - for CA region
        https://api.ovh.com/createToken/ - for US region
    )
    3.) Use the keys generated and configure them below where it says endpoint, appKey, appSecret, consumerKey
    4.) Customize anything else
    5.) Run the checker
*/

const phin = require('phin')
const chalk = require('chalk')
const net = require('net')
const ovh = require('ovh')({
    endpoint: "ovh-eu", // Endpoint here - it is based on which OVH region your account is with
    appKey: "APP KEY HERE",
    appSecret: "APP SECRET KEY HERE",
    consumerKey: "CONSUMER KEY HERE"
});

const discordURL = "WEBHOOK HERE";
const serverName = "SERVER NAME";
const host = "HOST/ISP";
const protectionProvider = "PROTECTION PROVIDER";
const ipBlock = process.argv[2];
const ipAddr = process.argv[3];
let mitigationEnabled = false;

if (process.argv.length < 4 || !net.isIPv4(ipAddr)) {
    console.log(chalk.magenta("Usage: node checker [IP Block] [IP Address]"));
} else {
    CheckMitigation();
}

async function CheckMitigation() {
    while (true) {
        let time = new Date();
        console.log(chalk.white.bold(`Checking mitigation status ${time.toLocaleTimeString()}`));
        ovh.request("GET", `/ip/${encodeURIComponent(ipBlock)}/mitigation/${ipAddr}`, (err, mitigationStatus) => {
            console.log(chalk.yellow(`IP Address: ${ipAddr} | Auto Mode: ${mitigationStatus.auto} | Permanent Mode: ${mitigationStatus.permanent}`));
            if (mitigationStatus.permanent === true && mitigationStatus.auto === true) {
                if (mitigationEnabled === true) {
                    console.log("Mitigation remains enabled.")
                } else if (mitigationEnabled === false) {
                    console.log("Mitigation mode enabled, sending alert");
                    mitigationEnabled = true;
                    SendAlert(true);
                }
            } else if (mitigationStatus.auto === false && mitigationEnabled === true) {
                console.log("Mitigation mode disabled, sending alert");
                mitigationEnabled = false;
                SendAlert(false);
            }
        });
        await new Promise(r => setTimeout(r, 5000));
    }
}

async function SendAlert(mode) {
    let description;
    let footer;
    let color;
    if (mode === true) {
        description = "A possible DDoS attack has been detected";
        footer = "Our system is attempting to mitigate the attack and the attack has been automatically captured."
        color = 16056320;
    } else if (mode === false) {
        description = "Mitigation mode has been disabled on the IP";
        footer = "End of attack on IP address.";
        color = 65338;
    }
    const webhookPayload = {
        "embeds": [{
            "title": "DDoS Attack",
            "description": description,
            "url": "https://courvix.com",
            "color": color,
            "fields": [{
                "name": "Server:",
                "value": serverName,
                "inline": true
            },
                {
                    "name": "IP Address:",
                    "value": ipAddr,
                    "inline": true
                },
                {
                    "name": "Host:",
                    "value": host,
                    "inline": true
                },
                {
                    "name": "Protection Provider:",
                    "value": protectionProvider,
                    "inline": true
                },
            ],
            "author": {
                "name": "Courvix Network",
                "url": "https://courvix.com",
                "icon_url": "https://i.imgur.com/2a3ccAN.png"
            },
            "footer": {
                "text": footer,
                "icon_url": "https://img.pngio.com/warning-icon-png-321332-free-icons-library-warning-icon-png-2400_2400.jpg"
            },
            "thumbnail": {
                "url": "https://cdn.countryflags.com/thumbs/france/flag-800.png"
            }
        }]
    }
    const request = phin.defaults({
        'method': 'POST',
        'parse': 'json',
        'data': webhookPayload
    })

    const res = await request(discordURL);
    console.log(res);
}
