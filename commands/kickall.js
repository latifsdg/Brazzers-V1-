export const name = 'kickall'

export async function execute({ sock, from }) {
  await sock.sendMessage(from, { text: '🚫 Cette commande kickall est à implémenter avec gestion admin.' })
}
