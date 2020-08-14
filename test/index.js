#!/usr/bin/env node
const gitVersionTag = require('../index.js');

test();

async function test() {
    const testRemoteUri = 'https://github.com/JoernBerkefeld/eslint-config-ssjs';

    let response;
    console.log('no params:');
    response = await gitVersionTag(testRemoteUri);
    console.log('response: ', response);

    console.log('\n');
    // Avoid being locked out: wait 3 seconds
    await sleep(3000);

    console.log('getLatest = true:');
    response = await gitVersionTag(testRemoteUri, {
        getLatest: true,
    });
    console.log('response: ', response);
    console.log('\n');
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
