# Website package

This directory contains GUI implementation of Emulator. It uses HTML5 Canvas utilizing Emulator from `core` package.

## Available scripts

`npm run dev` - compiles TypeScript and starts development server at port `1234`

`npm run build` - prepared production ready build in `dist` directory. It's used by other scripts

`npm run deploy` - creates production ready build, switched branch to new one, clean it up and pushes it to `website/deploy` branch which is used as GitHub Pages deployment.

## Installing / configuring the repo

**Make sure to correctly configure `core` directory first.**

1. Run `npm install`
2. Run `npm link gb-js-multi-emu-core` to link `gb-js-multi-emu-core` locally
3. Run `npm start` in `core` directory to build `core` package with automatic reload
4. Run `npm run dev` in `website` directory to start the app and launch `localhost:1234` in your web browser.

## How to build new release

Run `npm run deploy` in `website` directory.
Script will create production ready bundle, switch to new clean branch and push whole `dist` directory to remote branch `website/deploy`. This branch is used as main entrypoint for GitHub Pages