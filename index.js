const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log("Startup succeeded!");
});

client.on("guildMemberAdd", (member) => {
  const name = member.user.username;

  console.log(`${name} joined, sending message`);

  const message = new EmbedBuilder()
    .setTitle(`Welcome ${name} to`)
    .setDescription(
      `Chronos Client's Official Discord server. Nice to see you!\nIf you need some help, ask your question in <#976199262826270730>`
    )
    .setAuthor({
      name: "Chronos Client",
      iconURL:
        "https://cdn.modrinth.com/data/qBOrMQj2/2a2dd095e3d20fc0607f6d48939ae235ec450b0b.png",
      url: "https://modrinth.com/modpack/chronos",
    });

  member.send({ embeds: [message] });
});

client.login('process.env.TOKEN');
