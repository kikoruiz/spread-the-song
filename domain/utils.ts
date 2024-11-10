export function normalize(text: string) {
  const map: {[key: string]: string} = {
    ' ': '-',
    a: 'á|à|ã|â|À|Á|Ã|Â',
    e: 'é|è|ê|É|È|Ê',
    i: 'í|ì|î|Í|Ì|Î',
    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    c: 'ç|Ç',
    n: 'ñ|Ñ'
  }

  text = text.toLowerCase()

  for (const pattern in map) {
    text = text.replace(new RegExp(map[pattern], 'g'), pattern)
  }

  return text
}
