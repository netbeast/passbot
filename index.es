import Botkit from 'botkit'
import { store, retrieve } from './lib.es'

const BB8_TOKEN = 'xoxb-19063896503-MqDmJqVXtHFH8ad4wmvtw3BS'

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

  if (text.includes('get password')) res = await retrieve(text)
  if (text.includes('save password')) res = await store(text)

  bot.reply(msg, res)
}
