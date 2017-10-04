# Github Explorer
> Monorepo managed using `lerna`, containing implementations of a code challenge task using several front-end frameworks
- Angular
- React
- Vue (Unfortunately didn't make it)

## How to
It requires to have `node` greater than 8, `npm` version greater than 5 and [lerna](https://lernajs.io/) pre-installed

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

- Written in TypeScript|ES2015
- Linted using [tslint](https://github.com/palantir/tslint)
- Uses the UI Library [Clarity UI](https://vmware.github.io/clarity/)
- Live preview can be found [here](http://katrotz.space/github-explorer/angular)

### React
- Written in JSX|ES2015
- Unfortunately did not finish due to time constraints. Would have been linted using eslint.
- Uses the UI Library [Ant Design](https://ant.design/index-cn)
- Live preview can be found [here](http://katrotz.space/github-explorer/angular)