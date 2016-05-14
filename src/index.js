const Botkit = require('botkit')
const cmd = require('commander')
const helper = require('./lib')

cmd.option('--token [token]', 'Slack bot integration token').parse(process.argv)

const PASSBOT_TOKEN = cmd.token || process.env.PASSBOT_TOKEN

console.log('PASSBOT_TOKEN', PASSBOT_TOKEN)

const controller = Botkit.slackbot()
const bot = controller.spawn({
  token: PASSBOT_TOKEN
})

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Could not connect to Slack')
  console.log('Bot is online')
})

controller.on('mention', handle)
controller.on('direct_message', handle)
controller.on('direct_mention', handle)

function handle (bot, msg) {
  const text = msg.text

  if (text.indexOf('shut up') > -1)
    return bot.reply('_Entering standby mode..._')

  if (text.indexOf('get password') > -1)
    return helper.retrieve(text).then(function (res) { bot.reply(msg, res) })

  if (text.indexOf('save password') > -1)
    return helper.store(text).then(function (res) { bot.reply(msg, res) })

  return bot.reply(msg, 'bip bip bip!')
}
