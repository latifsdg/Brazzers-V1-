export const name = 'info'

export async function execute({ sock, from }) {
  await sock.sendMessage(from, { text: '🤖 *Brazzers V1* — bot créé par ton nom.' })
}
