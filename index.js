import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import fs from 'fs'
import path from 'path'

// charger dynamiquement les commandes du dossier commands
const commands = new Map()
const commandsDir = path.join(process.cwd(), 'commands')
fs.readdirSync(commandsDir).forEach(file => {
  if (file.endsWith('.js')) {
    import(path.join(commandsDir, file)).then(cmd => {
      commands.set(cmd.name, cmd)
    })
  }
})

async function startSock () {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({ auth: state, printQRInTerminal: true })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || !m.key.remoteJid) return

    const from = m.key.remoteJid
    const body =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ''
    if (!body.startsWith('!')) return

    const args = body.trim().split(/ +/)
    const commandName = args.shift().slice(1).toLowerCase()

    if (commands.has(commandName)) {
      try {
        await commands.get(commandName).execute({ sock, from, args, m })
      } catch (err) {
        console.error(err)
        await sock.sendMessage(from, { text: '❌ Erreur dans la commande.' })
      }
    }
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect.error = Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut
      if (shouldReconnect) {
        startSock()
      }
    } else if (connection === 'open') {
      console.log('✅ Connecté à WhatsApp')
    }
  })
}

startSock()
