[![NPM Package][npm-badge]][npm-link] [![License][license-badge]][license-link] [![Build Status][travis-badge]][travis-link] [![Coverage Status][coveralls-badge]][coveralls-link] [![Maintainability][cc-badge]][cc-link] [![Dependencies][dm-badge]][dm-link] [![Dev Dependencies][dmdev-badge]][dmdev-link] [![Greenkeeper badge][gk-badge]][gk-link]

# APC Test
Combined test dependencies for APC projects

- Test runner: **Mocha**
- Assertion library: **Chai**
- Spies, stubs and mocks: **Sinon**
- Mutation testing: **Stryker**
- CI:
  - **Travis**
- Reporters:
  - **Coveralls**
  - **CodeClimate**

## About

This package provides a skeleton for JS unit testing, coverage and mutation testing. The provided config assumes files to be tested match `src/**/*.js` and test specs match `test/**/*.spec.js` but it should be straight forward to add more globs to your config.

## Installation

```sh
npm install --save-dev apc-test
```

### NPM Scripts

Copy these scripts into your `package.json` file. They are used by the build in Travis (see below)

```json
  "test": "npm run lint && nyc mocha",
  "lint": "eslint *.js test/**/*.js src/**/*.js",
  "coverage": "nyc report --reporter=text-lcov | coveralls",
  "stryker": "stryker run"
```

### Git Ignore

Copy the following into your gitignore: 

```
# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Stryker reports and cache
.stryker-tmp
reports

```

### NYC Config

Copy the following into a `.nycrc` file:

```json
{
  "include": [ "src/**/*.js" ],
  "all": true,
  "watermarks": {
    "lines": [ 90, 99 ],
    "functions": [ 90, 99 ],
    "branches": [ 90, 99 ],
    "statements": [ 90, 99 ]
  },
  "reporter": [ "clover", "text", "text-summary", "html", "cobertura", "lcov" ],
  "cache": true
}
```

Or copy it `cp node_modules/apc-test/.nycrc .`

### Stryker Config

Add the following to a `stryker.conf.js` file:

```js
module.exports = config => {
  config.set({
    files: [
      {
        pattern: 'src/**/*.js',
        mutated: true,
        included: true
      },
      'test/**/*.js'
    ],
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest'
  })
}
```

Or copy it `cp node_modules/apc-test/.stryker.conf.js .`

### Travis YML

Add the following to a `.travis.yml` file:

```yml
language: node_js
node_js:
  - 'lts/*'
  - 'node'
after_script:
# Optionally run stryker in CI, although this currently isn't reported
# - npm run stryker
  - npm run coverage
```

Or copy it `cp node_modules/apc-test/.travis.yml .`

### README Badges

Add the badge images and links to the top of your markdown file:

```markdown
[![NPM Package][npm-badge]][npm-link] [![License][license-badge]][license-link] [![Build Status][travis-badge]][travis-link] [![Coverage Status][coveralls-badge]][coveralls-link] [![Maintainability][cc-badge]][cc-link] [![Dependencies][dm-badge]][dm-link] [![Dev Dependencies][dmdev-badge]][dmdev-link] [![Greenkeeper badge][gk-badge]][gk-link]
```

Add the links somewhere else in your markdown file. Replacing `my-org-name` and `my-module-name`.

```markdown
[npm-badge]: https://img.shields.io/npm/v/my-module-name.svg?maxAge=30
[npm-link]:https://npmjs.com/package/my-module-name
[license-badge]: https://img.shields.io/npm/l/my-module-name.svg
[license-link]: https://github/my-org-name/my-module-name/blob/master/LICENSE
[travis-badge]: https://travis-ci.org/my-org-name/my-module-name.svg?branch=master
[travis-link]: https://travis-ci.org/my-org-name/my-module-name
[coveralls-badge]: https://coveralls.io/repos/github/my-org-name/my-module-name/badge.svg?branch=master
[coveralls-link]: https://coveralls.io/github/my-org-name/my-module-name?branch=master
[cc-badge]: https://img.shields.io/codeclimate/maintainability/my-org-name/my-module-name.svg
[cc-link]: https://codeclimate.com/github/my-org-name/my-module-name/maintainability
[dm-badge]: https://img.shields.io/david/my-org-name/my-module-name.svg
[dm-link]: https://david-dm.org/my-org-name/my-module-name
[dmdev-badge]: https://img.shields.io/david/dev/my-org-name/my-module-name.svg
[dmdev-link]: https://david-dm.org/my-org-name/my-module-name
[gk-badge]: https://badges.greenkeeper.io/my-org-name/my-module-name.svg
[gk-link]: https://greenkeeper.io/
```

### Setting up 3rd party services

These steps assume a public github repo and public npm module.

1. Publish to Github
2. Add to travis CI (may need to sync account first) - https://travis-ci.org/profile/
3. Add to coveralls - https://coveralls.io/repos/new
4. Add to code climate - https://codeclimate.com/github/repos/new
5. Add to greenkeeper - https://github.com/apps/greenkeeper/installations/new
6. Copy codeclimate token to travis
    - Get reporter id from CodeClimate / Project / Settings / Test Coverage
    - Add it to the Travis repo settings as `CC_TEST_REPORTER_ID` environment variables
7. Check all badge are working (NPM and license won't work yet)
8. Publish to NPM

## APC Style

Recommended to be used with [apc-style](https://www.npmjs.com/package/apc-style) for linting of JS, SCSS and Pug files.


[npm-badge]: https://img.shields.io/npm/v/apc-test.svg?maxAge=30
[npm-link]:https://npmjs.com/package/apc-test
[license-badge]: https://img.shields.io/npm/l/apc-test.svg
[license-link]: https://github/APCOvernight/apc-test/blob/master/LICENSE
[travis-badge]: https://travis-ci.org/APCOvernight/apc-test.svg?branch=master
[travis-link]: https://travis-ci.org/APCOvernight/apc-test
[coveralls-badge]: https://coveralls.io/repos/github/APCOvernight/apc-test/badge.svg?branch=master
[coveralls-link]: https://coveralls.io/github/APCOvernight/apc-test?branch=master
[cc-badge]: https://img.shields.io/codeclimate/maintainability/APCOvernight/apc-test.svg
[cc-link]: https://codeclimate.com/github/APCOvernight/apc-test/maintainability
[dm-badge]: https://img.shields.io/david/APCOvernight/apc-test.svg
[dm-link]: https://david-dm.org/APCOvernight/apc-test
[dmdev-badge]: https://img.shields.io/david/dev/APCOvernight/apc-test.svg
[dmdev-link]: https://david-dm.org/APCOvernight/apc-test
[gk-badge]: https://badges.greenkeeper.io/APCOvernight/apc-test.svg
[gk-link]: https://greenkeeper.io/
