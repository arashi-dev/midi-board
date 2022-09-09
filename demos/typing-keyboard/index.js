const { MidiBoard } = require("./../../src")

const midiBoard = new MidiBoard()

midiBoard.keyboard("main")
    .setNote("C5", k => k.key(["a", "v"]))
    .setNote("D5", k => k.key(["b", "w"]))
    .setNote("E5", k => k.key(["c", "x"]))
    .setNote("F5", k => k.key(["d", "y"]))
    .setNote("G5", k => k.key(["e", "z"]))
    .setNote("A5", k => k.key(["f", "0"]))
    .setNote("B5", k => k.key(["g", "1"]))

    .setNote("C6", k => k.key(["h", "2"]))
    .setNote("D6", k => k.key(["i", "3"]))
    .setNote("E6", k => k.key(["j", "4"]))
    .setNote("F6", k => k.key(["k", "5"]))
    .setNote("G6", k => k.key(["l", "6"]))
    .setNote("A6", k => k.key(["m", "7"]))
    .setNote("B6", k => k.key(["n", "8"]))

    .setNote("C7", k => k.key(["o", "9"]))
    .setNote("D7", k => k.key(["p"]))
    .setNote("E7", k => k.key(["q"]))
    .setNote("F7", k => k.key(["r"]))
    .setNote("G7", k => k.key(["s"]))
    .setNote("A7", k => k.key(["t"]))
    .setNote("B7", k => k.key(["u"]))

    .setNote("C3", k => k.mode(0))
    .setNote("D3", k => k.mode(1))
    .setNote("E3", k => k.mode(2))
    .setNote("F3", k => k.key("up"))
    .setNote("G3", k => k.key("down"))
    .setNote("A3", k => k.key("left"))
    .setNote("B3", k => k.key("right"))

    .setNote("C4", k => k.key("space"))
    .setNote("D4", k => k.key("enter"))
    .setNote("E4", k => k.key("shift"))
    .setNote("F4", k => k.key("backspace"))
    .setNote("G4", k => k.key("control"))
    .setNote("A4", k => k.key("alt"))
    .setNote("B4", k => k.key("escape"))

    .on("mode", (mode) => console.log("Mode number:", mode))
    .on("key", (key) => {
        console.log("Key clicked:", key)

        return () => {
            console.log("Key released:", key)
        }
    })
    .on("note", (note) => {
        console.log("Note clicked:", note)

        return () => {
            console.log("Note released:", note)
        }
    });

midiBoard
    .start()
    .then(() => {
        const input = midiBoard.Input("Digital Piano")

        input.useKeyboard(midiBoard.keyboard("main"))
    });