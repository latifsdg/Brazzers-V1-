import fs from 'fs'
import path from 'path'

export const name = 'menu'

export async function execute({ sock, from }) {
  const caption = `
╭━━━❮ *📚 MENU BRAZZERS V1* ❯━━━╮
┃  📝 *Commandes principales :*
┃  ➤ !help – Afficher l'aide
┃  ➤ !info – Infos sur le bot
┃  ➤ !kickall – Expulser tous
┃  ➤ !spam [nbre] [texte] – Spam
╰━━━━━━━━━━━━━━━━━━━━╯
`

  const imgPath = path.join(process.cwd(), 'media', 'menu.jpg')
  await sock.sendMessage(from, {
    image: fs.readFileSync(imgPath),
    caption
  })
}
