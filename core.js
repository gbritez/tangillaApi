const dataAccess = require('./data-access');
const Wordnet = require("node-wordnet");

const excludedWords = new Set(["a", "the", "and", "of", "in", "be", "also", "as"]);
const wordnet = new Wordnet();

function cleanText(text) {
    text = text.toString().toLowerCase();
    let arrayFromText = text.split(/\s+/);
    arrayFromText = arrayFromText.filter(x => !excludedWords.has(x));
    return arrayFromText;
}

function removeDuplicatedResults(arr) {
    let synonyms = arr.reduce(function (acc, result) {
        return acc.concat(result.synonyms);
    }, []);
    return synonyms.filter((item, index) => synonyms.indexOf(item) === index)
}

async function lookUpSynonyms(text) {
    const counts = {}
    text = cleanText(text);

    for (const word of text) {
        const count = counts[word] || 0;
        if (count === 0) {
            let results = await wordnet.lookupAsync(word);
            if (results.length > 0) {
                results = removeDuplicatedResults(results);
                counts[word] = count + results.length;
            }
            else {
                counts[word] = 0;
            }
        }
        else {
            counts[word] = count + 1;
        }
    }

    const result = Object.entries(counts).map(([word, synonyms_found]) => ({
        word,
        synonyms_found
    }))

    return result;
}

module.exports = { lookUpSynonyms };