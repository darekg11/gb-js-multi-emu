# Core package

This directory contains main elements of emulator. It is headless Gameboy emulator with extra interfaces to allow interacting with various GUIs.

## Directory structure

`src/GameboyEmulator.ts` is a main exported class from this package allowing to easily start running emulations in GUI.

`src/components` directory is main directory for every Gameboy Emulator components such as CPU, GPU, Timers etc.

`src/components/event-bus` is custom component not present in actual Gameboy's hardware. It's a component allowing to communicate between different components. For example `memory` might call `UNMAP_BIOS` event from memory module and registered event handler in `GameboyEmulator.ts` might respond to it. It has simple interface of registering callbacks for specific events and one method to emit given event.

`src/components/cpu/opcodes` directory contains every Gameboy's CPU OP Code implementation. OP Codes are deivided by type: `BITS` / `JMP` / `LOAD` etc. Each OP Code is placed in separate directory, implementation is always placed in `index.ts` file with OP Code Memonic Table at the beggining of the file so it's easier to match code. Next to implementation in `index.ts` file, there is `index.spec.ts` file with unit tests for each OP Code

## Available scripts

`npm run build` - compiles TypeScript and spits out JavaScript files into `dist` directory

`npm start` - the same as `npm run build` but in `watch` mode so that any change to any file is recompilling TypeScript and updates JavaScript build files with newest version

`npm test` - runs Jest tests

`npm run test-coverage` - runs Jest tests and produces code coverage report in HTML. Report is availalbe in `coverage` directory

## Installing / configuring the repo

**All steps should be executed in `core` directory`**

1. Run `npm install`
2. Run `npm link` to create symbolic link to `core` package in global directory

## How to run tests?

1. Run `npm run build`
2. Run `npm test`


