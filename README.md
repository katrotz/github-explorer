# Github Explorer
> Monorepo managed using `lerna`, containing implementations of a code challenge task using several front-end frameworks

## Live preview
Please note that the preview versions might have routing issues due to relative path they are served from.
In case of issues, please consider running the local server as described below.
- [Angular](http://katrotz.space/cc/github-explorer/packages/angular/dist)
- [React](http://katrotz.space/cc/github-explorer/packages/react-app/build/repos/heremaps)
- Vue (Unfortunately didn't make it)

## How to
It requires npm package [lerna](https://lernajs.io/) globally pre-installed.
Tested with `node@8`, `npm@5`.

#### Install
Type the following command in the root directory of the monorepo.
It will install the dependencies for all packages.

```
lerna bootstrap
```

#### Run
Run the local web server for a specific application and follow the shell instructions
```
    cd packages/{packageName}
    npm start 
```

#### Test
To test all the packages run
```
    lerna run test
```
which will execute `npm test` in each package. To test a specific package run
```
    cd packages/{packageName}
    npm test 
```

## About

### Angular

- Written in TypeScript | ES2015
- Linted using [tslint](https://github.com/palantir/tslint)
- Tests basic functionality with jasmine
- Uses the UI Library [Clarity UI](https://vmware.github.io/clarity/)
- Live preview can be found [here](http://katrotz.space/cc/github-explorer/packages/angular/dist)

### React
- Written in JSX | ES2015
- Unfortunately did not finish due to time constraints. Would have been linted using eslint.
- Tests basic functionality with jest and enzyme
- Uses the UI Library [Ant Design](https://ant.design/index-cn)
- Live preview can be found [here](http://katrotz.space/cc/github-explorer/packages/react-app/build/repos/heremaps)