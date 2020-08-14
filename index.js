#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const simpleGit = require('simple-git');

/**
 *
 * @param {String} remoteUrl
 * @param {Object} [options]
 * @param {Boolean} [options.getLatest]
 * @returns {Promise<String[]|String>}
 */
async function gitVersionTag(remoteUrl, options) {
    const repoName = remoteUrl.split('/').pop().split('.')[0];
    const tempDir = path.join('node_modules', '.gitVersionTag');
    const testDir = path.join(tempDir, repoName);

    // create subfolder inside of node_modules as this is usually excluded from versioning
    // and hence would not interfere with the normal repo
    fs.mkdirSync(testDir, { recursive: true });
    process.chdir(testDir);

    const git = simpleGit();
    try {
        const initResult = await git.init();
    } catch (ex) {
        /* handle all errors here */
    }
    try {
        const addRemoteResult = await git.addRemote('origin', remoteUrl);
    } catch (ex) {
        /* handle all errors here */
        const addRemoteResult = await git.remote(['set-url', 'origin', remoteUrl]);
    }
    let tags = [];
    try {
        const listRemoteResult = await git.listRemote([
            '--tags',
            '--refs',
            '--sort=version:refname',
        ]);
        tags = listRemoteResult.split('\n').map((val) => val.split('refs/tags/').pop());
    } catch (ex) {
        /* handle all errors here */
        return { error: true, errorMsg: ex.message };
    }
    // file system cleanup
    process.chdir(`../`);
    fs.rmdir(repoName, { recursive: true }, function () {});
    // go back to original working directory
    process.chdir(`../../`);

    // result will include pre-release versions
    const versionsSorted = tags.filter(semver.valid).sort(semver.rcompare);

    let response;
    if (!options) {
        response = versionsSorted;
    } else if (options && options.getLatest) {
        // filter out pre-release versions and return latest
        response = semver.maxSatisfying(versionsSorted, '*');
    }
    return response;
}

module.exports = gitVersionTag;
