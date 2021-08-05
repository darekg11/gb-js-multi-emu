# Desktop package

This directory contains GUI implementation of Emulator. It uses Electron to run simple HTML web page utilizing Emulator from `core` package.

## Available scripts

`npm run watch` - compiles TypeScript and spits out JavaScript files into `dist` directory. It is automatically watching the files for changes and updates JavaScript files with newest version

`npm run copy-resources` - copies required resources to `dist` directory. It's used by other scripts

`npm run dev` - copies resources and starts app

`npm run clean-build` - cleans `dist` and `releases` directories. It's used by other scripts

`npm run build-typescript` - compiles TypeScript and spits out JavaScript files into `dist` directory. It's used by other scripts

`npm run build-write-commit` - it takes most recent GIT commit from your current state of working directory and it copies it into `git_commit` file. This file is later on copied with resources and used to show GIT revision of app in `Info` window. It's used by other scripts

`npm run build-release-linux` - build a TAR file with Linux version of the app

## Installing / configuring the repo

**Make sure to correctly configure `core` directory first.**

1. Run `npm install`
2. Run `npm link gb-js-multi-emu-core` to link `gb-js-multi-emu-core` locally
3. Run `npm start` in `core` directory to build `core` package with automatic reload
4. Run `npm run watch` in `destkop` directory to build `desktop` app with automatic reload
5. Run `npm run dev` in `desktop` directory to start the app

## How to build new release

**Linux** - run `npm run build-release-linux` in `desktop` directory.

Script will bundle all files together and create `tar.xz` archieve in `releases` directory. Untar it on Linux based OS and you are good to go by running `./GB\ JS\ Multi\ Emu`
