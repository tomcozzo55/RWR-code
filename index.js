const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("running");
});

app.get("/", (req, res) => {
  res.send("hey there");
});

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Collection,
} = require("discord.js");

const client = new Client({
  intents: [
    "Guilds",
    "DirectMessages",
    "GuildMembers",
    "GuildMessages",
    "GuildPresences",
    "MessageContent",
  ],
});
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(process.env.token);

const { client_id } = require("./config.js");

//client collections
client.commands = new Collection();
const commands = [];

//event handler
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

//command handler
const commandFiles = fs
  .readdirSync("./commands")
  .map((folder) =>
    fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"))
      .map((file) => `./commands/${folder}/${file}`)
  )
  .flat();

for (const file of commandFiles) {
  const command = require(`${file}`);
  if (Object.keys(command).length === 0) continue;
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
  console.log("Loaded: " + command.data.name);
}

//registeer slash command
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(client_id), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

//log in to the bot
client.login(process.env.token);
