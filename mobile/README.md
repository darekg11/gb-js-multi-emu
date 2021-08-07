# Mobile package

This directory contains GUI implementation of Emulator. It uses Ionic framework to run simple HTML web page via WebView utilizing Emulator from `core` package.

## Available scripts

`npm run android` - runs the app on your connected Android device or via emulator

`npm run build-write-commit` - it takes most recent GIT commit from your current state of working directory and it copies it into `src/git_commit.json` file. This file is later on copied with resources and used to show GIT revision of app in `Info` window. It's used by other scripts

`npm run build-production-android` - builds mulitple production ready APK files per CPu architecture. Files are placed in `dist` directory

## Installing / configuring the repo

**Make sure to correctly configure `core` directory first.**

1. Run `npm install`
2. Run `npm link gb-js-multi-emu-core` to link `gb-js-multi-emu-core` locally
3. Run `npm start` in `core` directory to build `core` package with automatic reload
4. Run `npm run android` to start the app on your mobile device or within the emulator

## How to build new release

**Android** - 

**Linux** - run `npm run build-production-android` in `mobile` directory.

Scripts will bundle all files together and create mulitple production ready APK files per CPU architecture in `dist` directory. You can then run `adb install <file.apk>` to install it on your mobile device
