const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");

const app = express();
app.use(express.json());

let sock;
const GROUP_ID = "120363360907365417@g.us";

async function startWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        version,
        auth: state
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;

    if (!text) return;

    // allow commands from yourself
    if (msg.key.fromMe && !text.startsWith("/")) return;

    const textClean = text.trim().toLowerCase();

    console.log("RAW:", JSON.stringify(textClean));

    let day;
    let team;

    if (textClean.includes("=")) {
        [day, team] = textClean.split("=");
        day = day.trim();
        team = team.trim();
    } else {
        day = textClean.trim();
        team = undefined;
    }

    const chatId = msg.key.remoteJid;

    console.log("DAY:", day, "TEAM:", team);

    if (day === "/monday") await sendMonday(chatId, team);
    else if (day === "/tuesday") await sendTuesday(chatId, team);
    else if (day === "/wednesday") await sendWednesday(chatId, team);
    else if (day === "/thursday") await sendThursday(chatId, team);
    else if (day === "/friday") await sendFriday(chatId, team);
    else if (day === "/saturday") await sendSaturday(chatId, team);
});

   sock.ev.on("connection.update", async (update) => {
    const { connection, qr } = update;

    if (qr) {
        console.log("Scan QR:");
        qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
        console.log("WhatsApp Connected ✅");

        const groups = await sock.groupFetchAllParticipating();
        console.log("===== YOUR GROUP IDS =====");

        Object.values(groups).forEach(g => {
            console.log(g.subject + " -> " + g.id);
        });
    }

    if (connection === "close") {
        startWhatsApp();
    }
});
}
startWhatsApp();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

async function sendMonday(chatId, team) {

const Team1 = `
*Team1 (Monday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *Before Afternoon Tea*
      ☑Clean Kitchen
      ☑ Tea/Coffee making
      ☑ Clean B-102 Kitchen`;

const Team2 = `
*Team2 (Monday)*

   *Before Morning Tea Break*
      ☑Washing Wiping Clothes
      ☑Washing B102 Linen
      ☑Refill Tissues, Sanitizers, Soaps & Cups
      ☑Vegetable shopping
      ☑Filling vegetable orders
      ☑B102 Bedmaking
      ☑Count Temp Storage
   *Before Lunch*
      ☑Restock Temp Storage
      ☑Drying Wiping Clothes
   *Before Afternoon Tea*
      ☑Place Z1 linen reminder slips
      ☑Folding Wiping Clothes`;

const Team3 = `
*Team3 (Monday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
      ☑Outside Entrance Cleaning
      ☑Lobby Washroom Basic
      ☑Lobby dust & wet mopping
   *Before Lunch*
      ☑Stairs Sweeping
      ☑Stairs Mopping
      ☑Main Passage Sweeping
      ☑Main Passage Mopping
   *Before Afternoon Tea*
      ☑Plates & Spoons Washing
      ☑Dining Hall Cleaning
   *After Afternoon Tea*
      ☑Refill Reception Basket
      ☑Tidy Up Basement Trolley
      ☑Clear garbage from dining hall
      ☑Clear garbage from lobby`;

const Team4 = `
*Team4 Reception (Monday)*

   *Before Morning Tea Break*
      ☑Clear Diswasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
   *Before Afternoon Tea*
      ☑Set for Tea Break
   *After Afternoon Tea*
      ☑Rinse and Clear Cups
      ☑Start Dishwasher`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}


async function sendTuesday(chatId, team) {

const Team1 = `
*Team1 (Tuesday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *Before Afternoon Tea*
      ☑Clean Kitchen
      ☑ Tea/Coffee making
      ☑ Clean B-102 Kitchen`;

const Team2 = `
*Team2 (Tuesday)*

   *Before Morning Tea Break*
      ☑Washing Wipping Clothes
      ☑Washing Linen
      ☑Bedmaking
      ☑Refill Tissues, Sanitzers, Soaps & Cups
   *Before Lunch*
      ☑Office Washroom Cleaning
      ☑Office Main Area Cleaning
      ☑Office#1 Cleaning
      ☑Drying Wiping Clothes
      ☑Drying Linen
      ☑Classroom Cleaning
   *Before Afternoon Tea*
      ☑Place linen reminder slips
      ☑Folding Wiping Clothes
      ☑Fold & Store Washed Linen`;

const Team3 = `
*Team3 (Tuesday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
      ☑Outside Entrance Cleaning
      ☑Lobby Washroom Basic
      ☑Dust & Wet Mop Lobby
   *Before Lunch*
      ☑A-Block Lift Cleaning
      ☑B-Block Lift Cleaning
      ☑A-Block Washroom Cleaning
      ☑Main passage sweeping & mopping

   *Before Afternoon Tea*
      ☑Plates & Spoons Washing
      ☑Dining Hall Cleaning
   *After Afternoon Tea*
      ☑Refill Reception Basket
      ☑Tidy Up Basement Trolley
      ☑Clear garbage from dining hall
      ☑Clear garbage from lobby`;

const Team4 = `
*Team4 Reception (Tuesday)*

   *Before Morning Tea Break*
      ☑Clear Diswasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
   *Before Afternoon Tea*
      ☑Set for Tea Break
   *After Afternoon Tea*
      ☑Rinse and Clear Cups
      ☑Start Dishwasher`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}

async function sendWednesday(chatId, team) {

const Team1 = `
*Team1 (Wednesday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *Before Afternoon Tea*
      ☑Clean Kitchen
      ☑ Tea/Coffee making
      ☑ Clean B-102 Kitchen`;

const Team2 = `
*Team2 (Wednesday)*

   *Before Morning Tea Break*
      ☑Washing Wiping Clothes
      ☑Washing Mop Threads
      ☑Washing Linen
      ☑Bedmaking
      ☑Dry Linen
      ☑Dry wiping clothes
      ☑Refill Tissues, Sanitizers, Soaps & Cups

   *Before Lunch*
      ☑Office Cleaning
      ☑Instructor 2 Office Cleaning
      ☑B Block Washing Area Cleaning
      ☑Drying Wiping Clothes
   *Before Afternoon Tea*
      ☑Folding Wiping Clothes
      ☑Place reminder slips
      ☑Fold & Store Washed Linen`;

const Team3 = `
*Team3 (Wednesday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
      ☑Outside Entrance Cleaning
      ☑Dust & Wet Mop Lobby
   *Before Lunch*
      ☑Lobby Washroom Thorough Clean
      ☑Basement sweeping & moping
      ☑Gym area cleaning 
      ☑Main Passage Sweeping
      ☑Main Passage Mopping
   *Before Afternoon Tea*
      ☑Plates & Spoons Washing
      ☑Dining Hall Cleaning
   *After Afternoon Tea*
      ☑Refill Reception Basket
      ☑Tidy Up Basement Trolley
      ☑Clear garbage from dining hall
      ☑Clear garbage from lobby`;

const Team4 = `
*Team4 Reception (Wednesday)*

   *Before Morning Tea Break*
      ☑Clear Dishwasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
   *Before Afternoon Tea*
      ☑Set for Tea Break
   *After Afternoon Tea*
      ☑Rinse and Clear Cups
      ☑Start Dishwasher`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}



async function sendThursday(chatId, team) {

const Team1 = `
*Team1 (Thursday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *Before Afternoon Tea*
      ☑Clean Kitchen
      ☑ Tea/Coffee making
      ☑ Clean B-102 Kitchen`;

const Team2 = `
*Team2 (Thursday)*

   *Before Morning Tea Break*
      ☑Washing Wipping Clothes
      ☑Washing Linen
      ☑Bedmaking
      ☑Refill Tissues, Sanitizers, Soaps & Cups
      ☑Vegetable shopping
   *Before Lunch*
      ☑Order filling
      ☑Drying Linen
      ☑Drying Wiping Clothes
   *Before Afternoon Tea*
      ☑Place linen reminder slips Z4
      ☑Folding Wipping Clothes
      ☑Folding & Storing Linen`;

const Team3 = `
*Team3 (Thursday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
      ☑Outside Entrance Cleaning
      ☑Lobby Washroom Basic
      ☑Lobby dust & wet mopping
   *Before Lunch*
      ☑Stairs Sweeping
      ☑Stairs Mopping
      ☑Main Passage Sweeping
      ☑Main Passage Mopping
   *Before Afternoon Tea*
      ☑Plates & Spoons washing
      ☑Dining Hall Cleaning
   *After Afternoon Tea*
      ☑Refill Reception Basket
      ☑Tidy Up Basement Trolley
      ☑Clear garbage from dining hall
      ☑Clear garbage from lobby`;

const Team4 = `
*Team4 Reception (Thursday)*

   *Before Morning Tea Break*
      ☑Clear Diswasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
   *Before Afternoon Tea*
      ☑Set for Tea Break
   *After Afternoon Tea*
      ☑Rinse and Clear Cups`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}

async function sendFriday(chatId, team) {

const Team1 = `
*Team1 (Friday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *Before Afternoon Tea*
      ☑Clean Kitchen
      ☑ Tea/Coffee making
      ☑ Clean B-102 Kitchen`;

const Team2 = `
*Team2 (Friday)*

   *Before Morning Tea Break*
      ☑Washing Wipping Clothes
      ☑Washing Linen
      ☑Bedmaking
      ☑Refill Tissues, Sanitizers, Soaps & Cups
      ☑Vegetable shopping
   *Before Lunch*
      ☑Order filling
      ☑Drying Linen
      ☑Drying Wiping Clothes
   *Before Afternoon Tea*
      ☑Place linen reminder slips Z4
      ☑Folding Wipping Clothes
      ☑Folding & Storing Linen`;

const Team3 = `
*Team3 (Friday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
      ☑Outside Entrance Cleaning
      ☑Lobby Washroom Basic
      ☑Lobby dust & wet mopping
   *Before Lunch*
      ☑Stairs Sweeping
      ☑Stairs Mopping
      ☑Main Passage Sweeping
      ☑Main Passage Mopping
   *Before Afternoon Tea*
      ☑Plates & Spoons washing
      ☑Dining Hall Cleaning
   *After Afternoon Tea*
      ☑Refill Reception Basket
      ☑Tidy Up Basement Trolley
      ☑Clear garbage from dining hall
      ☑Clear garbage from lobby`;

const Team4 = `
*Team4 Reception (Friday)*

   *Before Morning Tea Break*
      ☑Clear Diswasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
   *Before Afternoon Tea*
      ☑Set for Tea Break
   *After Afternoon Tea*
      ☑Rinse and Clear Cups`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}


async function sendSaturday(chatId, team) {

const Team1 = `
*Team1 (Saturday)*

   *Before Morning Tea Break*
      ☑Set Dining Hall
      ☑Tea/Coffee making
   *Before Lunch*
      ☑Clean B-102 Kitchen
      ☑ Set for Lunch
   *After Lunch*
      ☑Clean Kitchen
      ☑ Clean Garbage`;

const Team2 = `
*Team2 (Saturday)*

   *Before Morning Tea Break*
      ☑Washing Wiping Clothes
      ☑Washing Mop Threads
      ☑Refill Tissues, Sanitizers, Soaps & Cups
   *Before Lunch*
      ☑Drying Wiping Clothes
      ☑Refill Reception Basket
      ☑Tidy up Basement Trolley`;

const Team3 = `
*Team3 (Saturday)*

   *Before Morning Tea Break*
      ☑Garbage Collection
   *Before Lunch*
      ☑Outside Stairs Sweeping
      ☑Outside Pavement Sweeping`;

const Team4 = `
*Team4 (Saturday) Reception*

   *Before Morning Tea Break*
      ☑Clear Diswasher
      ☑Clean Flasks
      ☑Clean & refill vending machine
      ☑Lobby Washroom Cleaning
      ☑Dust & Wet Mop Lobby
      ☑Set for Tea Break
  *Before Lunch*
      ☑Rinse and Clear Cups
      ☑Clean Lobby Tea Area
      ☑Start Dishwasher`;

let message = "";

if (!team) {
    message = Team1 + "\n" + Team2 + "\n" + Team3 + "\n" + Team4;
} else if (team === "1") {
    message = Team1;
} else if (team === "2") {
    message = Team2;
} else if (team === "3") {
    message = Team3;
} else if (team === "4") {
    message = Team4;
}
if (!message) {
    message = "Invalid team. Use 1-4";
}


await sock.sendMessage(chatId,{text:message});
}
