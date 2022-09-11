[![npm version](https://badge.fury.io/js/midi-board.svg)](https://badge.fury.io/js/midi-board)
[![npm license](https://img.shields.io/npm/l/midi-board)](https://www.npmjs.com/package/midi-board)

# Midiboard

> You can add simply listen and react to your MIDI instrument. just like [this example](https://github.com/arashi-dev/midi-board/tree/main/demos/typing-keyboard) you can turn your MIDI piano to a typing keyboard. I wrote this library just for fun. I do not have plan to make it more advanced (but I will accept any issue, PR and maybe add some features if I had time)

## Prerequisites

This project requires NodeJS (version 10 or later) and Yarn

[Node](http://nodejs.org/) and [Yarn](https://yarnpkg.com/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.11.0
v16.15.1
```

If you don't have yarn installed try running this command.
```sh
npm install -g yarn
```

## Table of contents

- [Midiboard](#midiboard)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Importing MidiBoard (ES6)](#importing-midiboard-es6)
    - [NodeJS (require)](#nodejs-require)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

This project is nothing more than a Javascript library. so to use this library you have to install it first, then you can use the APIs it gives you to build your project.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with installing the package via yarn:

```sh
yarn add midi-board
```

## Usage

### Importing MidiBoard (ES6)

this project's module is `CommonJS` so you can simply import it via ES6 `import ... from` statement

```ts
import MidiBoard from "midi-board"
// or
import { MidiBoard } from "midi-board"
```

### NodeJS (require)
if you are importing it with require be aware that you should get the MidiBoard class by destructuring.

```ts
const { MidiBoard } = require("midi-board")
```

## Contributing

Every pull request is pleasured to me :) I hope you will have a lot of fun during contribution

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Built With

* VSCode - Editor
* Vox - Piano
* [RobotJS](https://github.com/jitsi/robotjs) - system keyboard simulation
* [WebMidi](https://github.com/djipco/webmidi) - port listening
* Love

## Authors

* **Arash Jahanbakhshan** - *Developer* - [arashi-dev](https://github.com/arashi-dev)

Just do a simple PR and after that add your name here :)

## License

[MIT License](https://arash-jahanbakhshan.mit-license.org) © Arash Jahanbakhshan