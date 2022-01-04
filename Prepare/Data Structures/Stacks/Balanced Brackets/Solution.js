// https://www.hackerrank.com/challenges/balanced-brackets/problem

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
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isMatch(start, end) {
    return (start === '(' && end === ')') || (start === '[' && end === ']') || (start === '{' && end === '}');
}

function isBalanced(s) {
    // Write your code here
    const len = s.length;
    if (len < 2) {
        return 'NO';
    }
    let stack = [];
    let start = 0;
    let next = 1;
    while(start < len) {
        if (isMatch(s.charAt(start), s.charAt(next))) {
            start += 2;
            next += 2;
        } else if (s.charAt(start) === '(' || s.charAt(start) === '[' || s.charAt(start) === '{') {
            stack.push(s.charAt(start));
            start++;
            next++;
        } else if ((s.charAt(start) === ')' || s.charAt(start) === ']' || s.charAt(start) === '}') && isMatch(stack.pop(), s.charAt(start))) {
            start++;
            next++;
        } else {
            return 'NO';
        }
    }
    return stack.length > 0 ? 'NO' : 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
