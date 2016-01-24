import fs from 'fs-promise'

export async function store (input) {
  const site = parse(input)
  console.log(site)
  const data = await fs.readFile('.passwords.json', 'utf8')
  console.log(data)
  let passwords = JSON.parse(data)
  console.log(passwords)
  passwords[site] = 'macombo'
  console.log(passwords)
  await fs.writeFile('.passwords.json', JSON.stringify(passwords))
  return '_tweep tweep tweep_'
}

export async function retrieve (input) {
  const site = parse(input)
  const data = await fs.readFile('.passwords.json', 'utf8')
  const passwords = JSON.parse(data)
  return passwords[site] || '\`!@#$%\`'
}

function parse (input) {
  const words = [ ... input.split(' ')]
  return words[words.lastIndexOf('for') + 1]
}
