import Botkit from 'botkit'
import cmd from 'commander'
import { store, retrieve } from './lib.es'

cmd.option('--token [token]', 'Slack bot integration token').parse(process.argv)

const BB8_TOKEN =  cmd.token || process.env.PASSBOT_TOKEN

console.log('BB8_TOKEN', BB8_TOKEN)

var controller = Botkit.slackbot()
var bot = controller.spawn({
  token: BB8_TOKEN
})

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Could not connect to Slack')
})

controller.on('mention', handle)
controller.on('direct_message', handle)
controller.on('direct_mention', handle)

async function handle (bot, msg) {
  const text = msg.text
  let res = 'bip bip bip!'

  if (text.includes('shut up')) res = '_Entering standby mode..._'
  if (text.includes('get password')) res = await retrieve(text)
  if (text.includes('save password')) res = await store(text)

  bot.reply(msg, res)
}
