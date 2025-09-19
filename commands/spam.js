export const name = 'spam'

export async function execute({ sock, from, args }) {
  if (args.length < 2) {
    await sock.sendMessage(from, { text: 'Usage : !spam <nombre> <texte>' })
    return
  }
  const count = parseInt(args[0])
  const textToSend = args.slice(1).join(' ')
  for (let i = 0; i < count; i++) {
    await sock.sendMessage(from, { text: `📢 ${textToSend}` })
  }
}
