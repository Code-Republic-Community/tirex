import get_hyperlinks from './parser/hyperlinks.js';
import Parser from './Parser.js';

async function get15_docs(){
let arr = await get_hyperlinks('https://www.guru99.com/mongodb-vs-mysql.html');
    for(let i = 0; i < 2; ++i) {
        await Parser(arr[i]);
    }
}

get15_docs();
