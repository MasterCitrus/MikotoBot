module.exports = (bot) => {
let prompt = process.openStdin()
prompt.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("587890132883865613").send(x.join(" "));
    });
}
