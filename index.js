require("dotenv/config");
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("bot is online");
  clearChannel();
});

async function clearChannel() {
  const channel = client.channels.cache.get(process.env.CHANNEL_ID); // Replace with your desired channel ID

  if (!channel) {
    console.log("Invalid channel ID. Unable to delete messages.");
    return;
  }

  try {
    const fetchedMessages = await channel.messages.fetch({ limit: 100 });
    await channel.bulkDelete(fetchedMessages, true);
    console.log("All messages deleted in the specified channel.");
  } catch (error) {
    console.error("Error occurred while deleting messages:", error);
  }
}

client.login(process.env.TOKEN);
