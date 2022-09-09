import defaultsDeep from "lodash/defaultsDeep"
import { Input, NoteMessageEvent, WebMidi } from "webmidi"
import { Keyboard } from "./Keyboard"
import { createChord } from "./utils/createChord"

export type MidiBoardInputOptions = {
    /**
     * options for chords.
     * false for disable.
     */
    chord?: false | {
        /**
         * maximum delay between chord's keys
         * @default 10
         */
        maxDelay?: number

        /**
         * the type a chord will be counted as released
         * 
         * one - counts right after one of the keys of chord gets released
         * 
         * all - counts while all of the keys of chord gets released
         */
        releaseType?: "one" | "all"
    }
}

const MidiBoardInputDefaultOptions: MidiBoardInputOptions = {
    chord: {
        maxDelay: 10
    }
}

export class MidiBoardInput {
    input: Input

    constructor(
        /**
         * The ID or the non-empty string to look for within the name of MIDI inputs
         */
        public id: string,
        /**
         * optional options
         */
        public options: MidiBoardInputOptions = { chord: { maxDelay: 10 } }
    ) {
        this.options = defaultsDeep(options, MidiBoardInputDefaultOptions)

        const input = WebMidi.getInputById(id) || WebMidi.getInputByName(id)

        if (!input) {
            throw new Error("input not found")
        }

        this.input = input
    }

    /**
     * input can listen and react by the keyboard rules
     * @param keyboard the target keyboard (can be selected via `instrument.keyboard("keyboard-name")`)
     */
    useKeyboard(keyboard: Keyboard) {
        this.addListener((chord) => {
            const note = chord.join(",")

            return keyboard.playNote(note)
        })
    }

    /**
     * add listener to input
     * @params callback a callback function which can optionally return a cleanup function that will be called after the chord/note release
     */
    private addListener(callback: (chord: string[], data: NoteMessageEvent) => void | ((data: NoteMessageEvent) => void)) {
        const chord: string[] = []

        let timeout: NodeJS.Timeout;

        this.input.addListener("noteon", (e) => {
            clearTimeout(timeout)
            chord.push(...createChord(e.note.identifier))

            timeout = setTimeout(() => {
                const chordClone = createChord(chord.slice().sort())
                chord.splice(0, chord.length)

                if (chordClone) {
                    const runNote = (notes: string[]) => {
                        const notesComb = notes.slice()
                        const cleanup = callback(notes, e)

                        if (cleanup) {
                            const cleanupListener = (e: NoteMessageEvent) => {
                                const identifier = e.note.identifier.toLowerCase()

                                const noteIndex = notesComb.indexOf(identifier)

                                if (noteIndex > -1) {
                                    notesComb.splice(noteIndex, 1)

                                    if (!(this.options.chord && this.options.chord.releaseType === "all") || notesComb.length) {
                                        cleanup(e)
                                        this.input.removeListener("noteoff", cleanupListener)
                                    }
                                }
                            }

                            this.input.addListener("noteoff", cleanupListener)
                        }
                    }

                    if (this.options.chord) {
                        runNote(chordClone)
                    } else {
                        chordClone.map(note => runNote([note]))
                    }
                }
            }, this.options.chord ? this.options.chord.maxDelay : 0)
        })
    }
}