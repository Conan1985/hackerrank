// https://www.hackerrank.com/challenges/contacts/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'contacts' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY queries as parameter.
 */

function contacts(queries) {
    // Write your code here
    let map = new Map();
    let result = [];
    queries.forEach(query => {
        if(query[0] === 'add') {
            for(let j = 0; j < query[1].length; j++) {
                const partialName = query[1].substring(0, j + 1);
                if(map.has(partialName)) {
                    map.set(partialName, map.get(partialName) + 1);
                } else {
                    map.set(partialName, 1);
                }
            }
        } else if (query[0] === 'find'){
            const partialFind = query[1];
            result.push(map.has(partialFind)? map.get(partialFind) : 0);
        }
    })
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const queriesRows = parseInt(readLine().trim(), 10);

    let queries = Array(queriesRows);

    for (let i = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    const result = contacts(queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
