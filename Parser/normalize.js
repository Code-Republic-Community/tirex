import pos from 'pos';
import lemmatize  from "wink-lemmatizer";
import { readFileSync } from "fs";
import LevenshteinDistance from 'natural';
import  singular  from 'pluralize';
var noisy_words = ["how", "a", "from",
    "we", "the", "what", "when", "where", "which", "with", "that", "this", "is", "where", "are", "an", "of", "in", "how", "to", "at", "by", "and", "it", "its", "her", "she", "he", "to", "as", "or", "to", "on", "am", 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
];
function remove_noisy_words(splited) {
    for (let i = 0; i < splited.length; ++i) {
        if (noisy_words.includes(splited[i])) {
            let index = splited.indexOf(splited[i]);
            splited.splice(index, 1);
            --i;
        }
    }
}
function make_word_singular(final_text) {
    let res = " ";
    let words = new pos.Lexer().lex(final_text);
    let tagger = new pos.Tagger();
    let taggedWords = tagger.tag(words);
    for (let i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        if (tag == "NN" || tag == "NNP" || tag == "NNPS" || tag == "NNS") {
            singular(word);
        }
        res = res + word + " ";
    }
    return res;
}
function get_dictionary() {
    let dictionary = readFileSync('./words.txt', 'utf8', ).split(/[\n]+/);
    return dictionary;
}
function get_programming_dictionary() {
    let programming_dictionary = readFileSync('./programmingTerms.txt', 'utf8', ).split(/[\n]+/);
    return programming_dictionary;
}
function find_exact_match(word, word_array) {
    let min_distance = 10;
    let min_distcane_word = word;
    for (let i = 0; i < word_array.length; ++i) {
        if ((LevenshteinDistance(word, word_array[i])) < min_distance) {
            if (min_distcane_word.length < word_array[i].length) {
                continue;
            } else {
                min_distance = (LevenshteinDistance(word, word_array[i]));
                min_distcane_word = word_array[i];
            }
        }
    }
    return min_distcane_word;
}
function find_matched_words(word, dictionary) {
    let matched = 0;
    let matched_words = [];
    for (let i = 0; i < dictionary.length; ++i) {
        matched = 0;
        if (word == dictionary[i]) {
            continue;
        } else {
            for (let j = 0; j < word.length; ++j) {
                if (word[j] == dictionary[i][j]) {
                    matched++;
                } else {
                    break;
                }
            }
            if (matched > 2) {
                matched_words.push(dictionary[i]);
            } else {
                continue;
            }
        }
    }
    if (matched_words.length == 0) {
        return word;
    } else {
        return find_exact_match(word, matched_words);
    }
}
function lemmatize_word(final_text) {
    let res = " ";
    let words = new pos.Lexer().lex(final_text);
    let tagger = new pos.Tagger();
    let taggedWords = tagger.tag(words);
    let programming_dictionary = get_programming_dictionary();
    for (let i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        if (programming_dictionary.includes(word)) {
            res = res + word + " ";
        } else {
            if (tag == "NN" || tag == "NNP" || tag == "NNPS" || tag == "NNS") {
                let word1 = lemmatize.noun(word);
                res = res + word1 + " ";
            } else if (tag == "VB" || tag == "VBD" || tag == "VBG" || tag == "VBN" || tag == "VBP" || tag == "VBZ") {
                let word1 = lemmatize.verb(word);
                res = res + word1 + " ";
            } else if (tag == 'JJ' || tag == "JJR" || tag == "JJS") {
                let word1 = lemmatize.adjective(word);
                res = res + word1 + " ";
            } else if (tag == "UH") {
                res = res + word + " ";
            } else {
                let dictionary = get_dictionary();
                let word1 = find_matched_words(word, dictionary);
                res = res + word1 + " ";
            }
        }
    }
    return res;
}
function remove_apostrophe(splited) {
    for (let i = 0; i < splited.length; ++i) {
        splited[i] = splited[i].replace("’s", "");
        splited[i] = splited[i].replace("’", "");
        splited[i] = splited[i].replace("'", "");
        splited[i] = splited[i].replace("`", "");
        splited[i] = splited[i].replace(/['"]+/g, '');
        splited[i] = splited[i].replace(/['“]+/g, '');
        splited[i] = splited[i].replace(/['”]+/g, '');
    }
    return splited;
}
function normalize(text) {
    let lowertext = text.toLowerCase();
    let splited = lowertext.split(/[ ,&.:?–()!—/*-=|><{}_©-]+/);
    let split_array = [];
    // remove noisy words
    remove_noisy_words(splited);
    splited = remove_apostrophe(splited);
    remove_noisy_words(splited);
    let final_text = "";
    //make string from array
    for (let i = 0; i < splited.length; ++i) {
        final_text = final_text + splited[i] + " ";
    }
    //lemmatize text
    return lemmatize_word(make_word_singular(final_text));
}
export default function find_and_normalize(result) {
    let final_text = normalize(result);
    return final_text;
}

