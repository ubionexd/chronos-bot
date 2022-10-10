const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const moment = require("moment");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  setInterval(() => {
    const guildCount = client.guilds.cache.map((g) => {
      return g.memberCount;
    });
    const members = guildCount - 3;
    client.user.setActivity(`${members} members`, {
      type: ActivityType.Watching,
    });
    
    console.log(`Update presence!\nTotal members: ${guildCount}\nReal members: ${members}`)
  }, 3600000);

  console.log("Startup succeeded!");
});

client.on("guildMemberAdd", (member) => {
  const name = member.user.username;
  const id = member.user.id;
  let time = moment.utc().format("YYYY.MM.DD hh:mm");
  console.log(`${name} (${id}) joined. Sending message...`);

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
    })
    .setColor(0xfa824c)
    .setFooter({ text: `Joined at ${time} UTC` });

  member.send({ embeds: [message] });
});

client.login(process.env.DEPLOY_TOKEN);
