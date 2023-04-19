const WordNet = require("node-wordnet");

const excludedWords = new Set(["a", "the", "and", "of", "in", "be", "also", "as"]);
const wordnet = new WordNet();


function cleanText(text) {
    const arrayFromText = text.toString().toLowerCase().split(/\s+/);
    return arrayFromText.filter(x => !excludedWords.has(x));
}

function removeDuplicatedResults(synset) {
    const synonyms = synset.reduce((acc, result) => {
        return acc.concat(result.synonyms);
    }, []);
    return synonyms.filter((item, index) => synonyms.indexOf(item) === index)
}

async function getWordnetSynonyms(word) {
    const synonyms = await wordnet.lookupAsync(word);
    return synonyms;
}

async function findSynonyms(text) {
    try {
        const words = cleanText(text);

        let synonyms = {};
        for (let word of words) {
            let synset = await getWordnetSynonyms(word);
            synonyms[word] = removeDuplicatedResults(synset)
        }

        const result = words.reduce((output, word) => {
            const synonymsOfWord = synonyms[word]
            const key = Object.keys(output).find(word => synonymsOfWord.includes(word));
            return key ? { ...output, [key]: output[key] + 1 } : { ...output, [word]: 0 }
        }, {})

        return Object.entries(result).map(([word, synonyms_found]) => ({ word, synonyms_found }))
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { findSynonyms };