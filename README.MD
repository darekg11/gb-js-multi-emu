# What is this project?
This project is yet another Gameboy + Gameboy Color emulator written entirely in TypeScript.
The goal of this project was to write core of the emulator in TypeScript and then port the emulation to all platforms - web, desktop and mobile.

# Demo
You can checkout running Emulator in web on GitHub pages [here](https://darekg11.github.io/gb-js-multi-emu/)

# What is status of this project? Is it finished, is it still in development?
It's just fun little project done on the side.
Ultimate goal is to support MBC0, MBC1, MBC2, sound, most possible accurate timing, saving and loading emulation state to run all Pokemon ROMs.

# Project structure
Theare are three four main directories in repository:

`core` - holds Emulator source code for every component such as CPU, Memory, GPU, Timers etc. This is completely separatered from any kind of rendering environment such as web / mobile / desktop. Emulator exposes events or callback allowing to retrieve events such as draw frame or input handlers.

`desktop` - this is desktop GUI implementation for Emulator. It uses `core` package for emulation and currently is running via `Electron` on desktop. Releases currently are build only for Linux since I am running Ubuntu.

`mobile` - this is mobile GUI implementation for Emulator. It ueses `core` pacakge for emulation and currently is running via `Ionic` framework on mobile. Releases currently are build only for Android since I do not own IOS device.

`website` - this is web GUI implementation for Emulator. It uses `core` package for emulation and currently is running via `HTML5 canvas` on web. Release is available under GitHub page link [here](https://darekg11.github.io/gb-js-multi-emu/). It's tested on Firefox and Chromium.

Each of these directories contains it's own `README.md` file. Please refer to them for more documenation on each component including `npm` scripts description, directory structure, etc.

# What are the supported features / what is missing?
| Feature             | Status             | Addtional description
| ------------------- | ------------------ | ---------------------------------
| CPU                 | :heavy_check_mark: | Done, CPU running at 4.194304 MHz
| CPU + Memory Timing | :x:                | There is problem with passing instr_timing test tests. The issue arrises from the fact that each CPU OP Code is retuning number of cycles by the end of execeution and ticks are incremented once at the end. Correct implementation would increase ticks at each memory read / write so that it could be synced correectly
| Timer - DIV         | :heavy_check_mark: | Done
| Timer - TIMA        | :heavy_check_mark: | Done
| Joypad              | :heavy_check_mark: | Done
| GPU - Classic       | :heavy_check_mark: | GPU is only not passing timing test in DMG_ACID test ROM. It's due to timing implementation issues mentioned earlier in CPU
| GPU - Color         | :x:                | Not started at all
| MBC 0               | :heavy_check_mark: | Done, Tetris and Dr Mario both launches
| MBC 1               | :x:                | Coming soon
| MBC 2               | :x:                | Coming soon
| Sound               | :x:                | Not started at all, coming after MBC1 and MBC2 support + timing issues resolved
| Saving state        | :x:                | Not started at all, coming after sound support
| Loading state       | :x:                | Not started at all, coming after sound support
| 60 FPS constant     | :x:                | It's not an issue on web or desktop but on mobile devices there are sometimes drops to under 40 FPS. Consider adding cache for graphics so that background + tiles are re-rendered only when they are changed.
| Upscaling           | :heavy_check_mark: | Working, scaling up to 5 times original resolution. Algorithm is pretty dumb but it is enough for now

# E2E Tests Status
This section is to show emulator compability status by running E2E Tests for various components such as CPU or GPU.
Currently those tests are run manually, but in future those will run automatically by comparing hash checksum of VRAM content with baseline hash.

## CPU Tests
### - Blargg's test suite:
`01-special`:

![special](https://user-images.githubusercontent.com/11317951/127767497-ca4d3f5d-c8e3-45be-a9c3-892922e02b20.png)

`02-interrupts`:

![interrupts](https://user-images.githubusercontent.com/11317951/130689655-23ba99be-b5a3-4ced-a4ea-06c777c270b8.png)

`03-op sp,hl`:

![op-sp-hl](https://user-images.githubusercontent.com/11317951/127767612-08f03679-2d92-4466-a4bb-782952ee30f9.png)

`04-op r,imm`:

![op-r-imm](https://user-images.githubusercontent.com/11317951/127767613-d4a50f07-92bd-4d03-b4b3-9dc9d5723056.png)

`05-op rp`:

![op-rp](https://user-images.githubusercontent.com/11317951/127767676-3a5ff548-6e12-4d5a-8311-68481de1101c.png)

`06-ld r,r`:

![ld-rr](https://user-images.githubusercontent.com/11317951/127767687-531e3b1d-31ed-441d-ad27-5b00ffaf7dd0.png)

`07-jr,jp,call,ret,rst`:

![jr-jp-call-ret-rst](https://user-images.githubusercontent.com/11317951/127767692-440e3435-b18d-42dd-8890-275a8a999f08.png)

`08-misc instrs`:

![misc-instrs](https://user-images.githubusercontent.com/11317951/127767802-0a23a7c9-a4f1-4289-8979-187f5639b15f.png)

`09-op r,r`:

![op-r-r](https://user-images.githubusercontent.com/11317951/127767809-cdd1ded5-f636-4c73-95fa-509d27d1f285.png)

`10-bit ops`:

![bit-ops](https://user-images.githubusercontent.com/11317951/127767815-32adaf34-bb22-457f-8dcd-1cc944e5bd1c.png)

`11-op a,(hl)`:

![op-a-hl](https://user-images.githubusercontent.com/11317951/127767837-9bf9f0cb-2fa2-409f-930d-eababcb3886c.png)


## GPU Tests
### DMG ACID2

![dmg-acid2](https://user-images.githubusercontent.com/11317951/127767910-104f88f5-f630-4515-a668-86d49214017d.png)

**It's not 100% accurate due to incorrect CPU / Memory timing**

### Fairy lake

![fairy-lake](https://user-images.githubusercontent.com/11317951/130689865-4e40389b-05b2-4b87-b90d-eafb10f6ddff.png)


# Knowledge list - articles / tutorials / videos / specs / repos / test ROMs:

- https://www.youtube.com/watch?v=HyzD8pNlpwI - ultimate Gameboy talk
- http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf - Gameboy CPU Manual
- https://github.com/trekawek/coffee-gb/ - easy to read Gameboy Emulator in Java
- https://github.com/juchi/gameboy.js - Gameboy in pure JS
- https://github.com/nakardo/node-gameboy#readme - Gameboy in pure JS and for Node
- https://www.youtube.com/watch?v=B7seNuQncvU - creating Gameboy emulator in Rust - talk
- http://imrannazar.com/GameBoy-Emulation-in-JavaScript:-The-CPU - article about creating Gameboy emulator in JS
- https://gbdev.gg8.se/wiki/articles/Main_Page - Gameboy development wiki
- https://gekkio.fi/files/gb-docs/gbctr.pdf - Gameboy technical reference PDF
- https://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html - HTML Table with OP Code instruction set including CPU cycles, memory timing, etc - really usefull
- https://gbdev.gg8.se/files/roms/blargg-gb-tests/ - test ROMs
- https://wornwinter.wordpress.com/2015/02/14/adventures-in-gameboy-emulation-part-2-the-cpu/ - step by step series for Gameboy Emulator in C++
- https://realboyemulator.wordpress.com/2013/01/03/a-look-at-the-game-boy-bootstrap-let-the-fun-begin/ - Gameboy BOOT ROM explained instruction by instruction - really usefull at the beggining when you need to debug if your emulator is behaving correctly on BOOT ROM
- https://github.com/retrio/gb-test-roms/tree/master/cpu_instrs - Blargg's test ROM repo having one uber ROM for all tests and splitted by tests smaller ROMs fitting within MBC0
- https://github.com/Gekkio/mooneye-gb - well document and accurate Gameboy Emulator in Rust
- https://gbdev.io/pandocs/ - Legendary Pan Docs
- http://www.codeslinger.co.uk/pages/projects/gameboy/beginning.html - amazing step by step article on how to implement each subsytem
- https://github.com/juchi/gameboy.js/ - easy to read Gameboy Emulator in JS.