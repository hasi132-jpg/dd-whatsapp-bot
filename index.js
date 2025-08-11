const { cmd } = require('./command');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Load order plugin with all commands
require('./plugins/order');

// Start express server
app.get("/", (req, res) => {
  res.send("hey, ❤️ D & D BOT with SQLite ❤️ started✅");
});
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// මෙහෙ ඔබගේ WhatsApp connection එක, Baileys socket, event handlers වගේ වැඩ දාලා connectToWA() function එකක් හදාගන්න පුළුවන්
// මේක වැඩිදුරටත් build කරලා ඔබගේ bot එක run කරන්න.
