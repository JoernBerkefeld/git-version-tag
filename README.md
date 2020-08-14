# Git Version Tag

This package allows you fetch all or just the latest version of any git repo, independent of whether it's hosted on Github, Gitlab or Bitbucket and their respective Enterprise versions.

It does not handle authentication but instead assumes that this is used on repos that the user already has access to and has logged in using system-side key managers.

## Usage

```js
const remoteUri = 'https://github.com/JoernBerkefeld/eslint-config-ssjs';

// no params
response = await gitVersionTag(remoteUri);
console.log('Array of found tags: ', response);
// example:
// ['v1.1.1', 'v1.1.0','v1.0.5', 'v1.0.4','v1.0.3', 'v1.0.2','v1.0.1']
]


// getLatest=true
response = await gitVersionTag(remoteUri, {getLatest: true,
});]
console.log('latest version: ', response);
// example:
// 'v1.1.1'
```

## Options

### getLatest

Type: `Boolean`
Description: limits the result set to the highest non-pre-release version.

## License

See [LICENSE](https://raw.githubusercontent.com/JoernBerkefeld/git-version-tag/master/LICENSE)
