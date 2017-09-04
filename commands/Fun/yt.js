const { Command } = require('klasa');
const {
  get
} = require("snekfetch");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: 'youtube',
      runIn: ['text'],
      permLevel: 10,
      botPerms: ['SEND_MESSAGES'],
      usage: '<channel:string>'
    });
  }

  async run(msg, [...channel]) {
    const APIKey = this.client.config.google_api;
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channel}&key=${APIKey}&maxResults=1&type=channel`;
      const a = await get(url).then(res => res.body).catch(e => msg.reply(e.message));
      const url2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${a.items[0].id.channelId}&key=${APIKey}`;
      const subcount = await get(url2).then(res => res.body).catch(e => msg.reply(e.message));
      const embed = new this.client.methods.Embed()
        .setFooter("YouTube Channel Statistics")
        .setTimestamp()
        .setColor("#ea5655")
        .setAuthor(a.items[0].snippet.channelTitle, a.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/channel/${a.items[0].id.channelId}`)
        .setDescription(`**Channel Description:** ${a.items[0].snippet.description}`)
        .addField("Subsciber Count:", parseInt(subcount.items[0].statistics.subscriberCount).toLocaleString(), true)
        .addField("View Count:", parseInt(subcount.items[0].statistics.viewCount).toLocaleString(), true)
        .addField("Video Count:", parseInt(`${subcount.items[0].statistics.videoCount}`).toLocaleString(), true)
        .addField("Created At:", moment(a.items[0].snippet.publishedAt).format('dddd, MMMM Do YYYY'), true)
        .setThumbnail(a.items[0].snippet.thumbnails.high.url);
      return msg.channel.send({ embed });

    } catch (e) {
      console.log(e);
      return msg.reply(":x: There was an error, please try again with a valid URL or Channel Name.");
    }
  }
};