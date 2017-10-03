# Github Explorer
> Monorepo managed using `lerna`, containing implementations of a code challenge task using several? front-end frameworks
- Angular (v)
- React (x)
- VueJS (x)

## How to
#### Install
Type the following command in the root directory of the monorepo.
It will install the dependencies for all packages.

```
lerna bootstrap
```

#### Run
Run the local web server and follow the shell instructions
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

