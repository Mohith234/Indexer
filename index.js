const fs = require('fs');

const excludeWords = fs.readFileSync('exclude-words.txt', 'utf8').split('\n');

function normalizeWord(word) {
  return word.toLowerCase().replace(/[!-@]/g, '');
}

const index = {};

for (let i = 1; i <= 3; i++) {
  const page = fs.readFileSync(`Page${i}.txt`, 'utf8');
  const words = page.split(/[\s-/]+/);
  for (let j = 0; j < words.length; j++) {
    const word = normalizeWord(words[j]);
    if (!excludeWords.includes(word)) {
      if (!index[word]) {
        index[word] = [i];
      } 
      else if (!index[word].includes(i)) {
        index[word].push(i);
      }
    }
  }
}

const indexKeys = Object.keys(index).sort();
fs.writeFileSync('index.txt', 'Word : Page Numbers\n-------------------\n');

indexKeys.forEach((word) => {
  const pageNum = [...new Set(index[word])].join(',');
  fs.appendFileSync('index.txt', `${word} : ${pageNum}\n`);
});

console.log('Index created successfully!');