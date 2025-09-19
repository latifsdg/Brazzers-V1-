export const name = 'help'

export async function execute({ sock, from }) {
  await sock.sendMessage(from, { text: 'ℹ️ Tape !menu pour voir toutes les commandes.' })
}
