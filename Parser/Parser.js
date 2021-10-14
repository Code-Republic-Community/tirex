import SaveData from './saver/SaveData.js';
import parser from './parser/parser.js';

export default async function Parse(MAIN_URL){
    const result = await parser(MAIN_URL);
    SaveData(result.PageTitle, result.MainPageURL, result.PageContent);
}
