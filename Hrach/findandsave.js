import { saveid } from "./saveid.js";
import { find } from "./find.js";

export function FindAndSave(word) {

    find(word).then(r => saveid(word, r))

}