import { WebMidi } from "webmidi"
import { MidiBoardInput } from "./Input"
import { Keyboard } from "./Keyboard"

export class MidiBoard {
    private keyboards: Record<string, Keyboard> = {}
    private inputInstances: Record<string, MidiBoardInput> = {}

    constructor() {
        if (!WebMidi.supported) {
            throw new Error("WebMidi is not supported in this environment, MidiBoard needs WebMidi to be able to work")
        }
    }

    /**
     * start the process if enabling `WebMidi` 
     */
    start(): Promise<typeof WebMidi> {
        return WebMidi.enable()
    }

    /**
     * helper property equivalent to `WebMidi.inputs`
     */
    inputs = WebMidi.inputs

    /**
     * select or create (automatically, if not exists) the Keyboard class
     * @param name the name of keyboard
     * @returns instance of `Keyboard`
     */
    keyboard(name: string) {
        return this.keyboards[name] ||= new Keyboard()
    }

    /**
     * select or create (automatically, if not exists) the MidiBoardInput class
     * @param id the id or name of input
     * @returns instance of `MidiBoardInput`
     */
    Input(id: string) {
        return this.inputInstances[id] ||= new MidiBoardInput(id)
    }
}