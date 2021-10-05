const SaveData = require('./saver/SaveData');
const parser = require('./parser/parser');

module.exports = async function Parse(MAIN_URL){
    const result = await parser(MAIN_URL);
    SaveData(result.PageTitle, result.MainPageURL, result.PageContent);
}
