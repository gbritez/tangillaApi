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

async function findSynonyms(text) {
    try {
        const words = cleanText(text);

        const result = await words.reduce(async (output, word) => {
            const synonymsOfWord = await wordnet.lookupAsync(word).then((result) => { return removeDuplicatedResults(result) });
            const synonyms = await output;
            const key = Object.keys(synonyms).find(word => synonymsOfWord.includes(word));
            return key ? { ...synonyms, [key]: synonyms[key] + 1 } : { ...synonyms, [word]: 0 }
        }, {})

        return Object.entries(result).map(([word, synonyms_found]) => ({ word, synonyms_found }))
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { findSynonyms };