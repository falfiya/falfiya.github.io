const Eris = require("eris");
const rl = require("readline-sync");

/** @type {import("eris").Client} */
let bot_token; {
   throw new Error("Replace the token");
   bot_token = "";
};
const bot = new Eris(bot_token);

const put = process.stdout.write.bind(process.stdout);
const puts = s => process.stdout.write(`${s}\n`);

async function main() {
   bot.editStatus("offline");
   put("\x1b[H\x1b[2J\x1b[3J");
   let guild; {
      const guilds = bot.guilds.map(g => g);
      puts(`I am in ${guilds.length} guild${guilds.length > 1 ? "s" : ""}`);
      guilds.forEach((guild, index) => {
         puts(`${index}. ${guild.name}#${guild.id}`);
      });

      puts("\nWhich guild do you want to operate on?");
      puts(`Input 0 to ${guilds.length - 1}`);
      let guild_idx = null;
      while (guild_idx === null) {
         const t_idx = +rl.question("> ");
         if (Number.isInteger(t_idx) && t_idx < guilds.length) {
            guild_idx = t_idx;
         } else {
            puts("Try again.");
         }
      }
      guild = guilds[guild_idx];
   }

   {
      puts(`Operating on ${guild.name}#${guild.id}\nAre you sure? [y/n]`);
      const sure = rl.question("> ");
      if (sure !== "y") {
         puts("disconnecting bot.");
         bot.disconnect();
         puts("exiting");
         process.exit(0);
      }
   }

   /** @type {import("eris").TextChannel} */
   let channel; {
      const channels = guild.channels.map(c => c);
      puts(`I am in ${channels.length} channel${channels.length > 1 ? "s" : ""}`);
      channels.forEach((channel, index) => {
         puts(`${index}. ${channel.name}#${channel.id}`);
      });

      puts("\nWhich channel do you want to operate on?");
      puts(`Input 0 to ${channels.length - 1}`);
      let channel_idx = null;
      while (channel_idx === null) {
         const t_idx = +rl.question("> ");
         if (Number.isInteger(t_idx) && t_idx < channels.length) {
            channel_idx = t_idx;
         } else {
            puts("Try again.");
         }
      }
      channel = channels[channel_idx];
   }

   {
      puts(`Operating on #${channel.name} in ${guild.name}\nAre you sure? [y/n]`);
      const sure = rl.question("> ");
      if (sure !== "y") {
         puts("disconnecting bot.");
         bot.disconnect();
         puts("exiting");
         process.exit(0);
      }
   }

   /** @type {import("eris").Member} */
   let member; {
      const members = guild.members.map(m => m);
      puts(`I see ${members.length} member${members.length > 1 ? "s" : ""}`);
      members.forEach((member, index) => {
         puts(`${index}. ${member.username}#${member.discriminator}`);
      });

      puts("\nWhich member do you want to operate on?");
      puts(`Input 0 to ${members.length - 1}`);
      let member_idx = null;
      while (member_idx === null) {
         const t_idx = +rl.question("> ");
         if (Number.isInteger(t_idx) && t_idx < members.length) {
            member_idx = t_idx;
         } else {
            puts("Try again.");
         }
      }
      member = members[member_idx];
   }
   const fullmembername = `${member.username}#${member.discriminator}`;

   {
      puts(`Deleting all messages from ${fullmembername} in #${channel.name}`);
      puts("Are you sure? [y/n]");
      const sure = rl.question("> ");
      if (sure !== "y") {
         puts("disconnecting bot.");
         bot.disconnect();
         puts("exiting");
         process.exit(0);
      }
   }

   {
      puts(`Deleting all messages from ${fullmembername} in #${channel.name}`);
      puts("Are you really sure? [y/n]");
      const sure = rl.question("> ");
      if (sure !== "y") {
         puts("disconnecting bot.");
         bot.disconnect();
         puts("exiting");
         process.exit(0);
      }
   }

   puts("starting message deletion");
   const size = 50;
   let beforeid = "750611964665004073";
   let batch = 0;
   let count = 0;
   function printstatus(thiscount) {
      put(`\rbatch ${batch}x${size} found ${thiscount} now at ${count} messages from ${fullmembername}`);
   }
   while (true) {
      const messages = await channel.getMessages(size, beforeid);
      let thiscount = 0;
      for (const cmessage of messages) {
         if (cmessage.author.id === member.id) {
            count++;
            thiscount++;
            await cmessage.delete();
            printstatus(thiscount);
         }
      }
      await new Promise(res => setTimeout(res, 5000));
      printstatus(thiscount);
      puts(`\nbefore ${beforeid}`);
      batch++;
      beforeid = messages[messages.length - 1].id;
   }
}

bot.on("ready", main);

bot.connect();
