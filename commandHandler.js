const { commands } = require("./command");

async function handleCommand(conn, mek, prefix = ".") {
  try {
    const messageType = Object.keys(mek.message)[0];
    let body = "";
    if (messageType === "conversation") {
      body = mek.message.conversation;
    } else if (messageType === "extendedTextMessage") {
      body = mek.message.extendedTextMessage.text;
    } else if (messageType === "imageMessage") {
      body = mek.message.imageMessage.caption || "";
    } else {
      body = "";
    }
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const cmd = commands.find(
      (c) => c.pattern === commandName || (c.alias && c.alias.includes(commandName))
    );
    if (!cmd) return;

    await cmd.function(conn, mek, {
      body,
      command: commandName,
      args,
      prefix,
      reply: (text) => conn.sendMessage(mek.key.remoteJid, { text }, { quoted: mek }),
    });
  } catch (err) {
    console.error("Command handler error:", err);
  }
}

module.exports = { handleCommand };
