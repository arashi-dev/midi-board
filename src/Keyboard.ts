import robot from "@jitsi/robotjs"
import EventEmitter2 from "eventemitter2";
import { createChord } from "./utils/createChord";

type Callback = (keyboard: Keyboard) => void | (() => void)
export type Dictionary = Record<string, Callback>

export type KeyboardEvents = {
    mode: (mode: number) => void;
    key: (key: string) => void | (() => void);
    note: (notes: string[]) => void | (() => void);
}

export class Keyboard {
    private dict: Dictionary = {}
    private _mode = 0
    public event = new EventEmitter2<KeyboardEvents>()

    /**
     * set a note/chord and a callback. the callback will be run whenever the note/chord get pressed.
     * @param note can be like `"C4"`, `"c4"`, `["A3", "C4", "E4"]`
     * @param callback a callback that accepts an argument for Keyboard class instance and also can optionally return a cleanup function which will be run right after the note/chord gets released
     * @returns this - for chain method purpose
     */
    setNote(notes: string | string[], callback: Callback) {
        const chord = createChord(notes)

        this.dict[chord.join(",")] = thisArg => {
            const cleanup = callback(thisArg)

            const eventCleanups = this.event.emitAsync("note", chord)

            return () => {
                cleanup?.()

                eventCleanups.then(cleanups => cleanups.forEach(cleanup => cleanup?.()))
            }
        }

        return this
    }

    /**
     * play/run the note set by `setNote()`
     * @param notes note or chord
     * @returns cleanup function or void
     */
    playNote(notes: string | string[]) {
        const chord = createChord(notes)

        return this.dict[chord.join(",")]?.(this)
    }

    /**
     * checks is the note/chord set or not
     * @param notes note or chord
     * @returns boolean
     */
    exists(notes: string | string[]) {
        const chord = createChord(notes)

        return !!this.dict[chord.join(",")]
    }

    /**
     * simulates system keyboard key press
     * @param key key(s) to press. if set as an array, the index of the key will be selected by the `mode` value
     * @returns cleanup function (key releasing) or void
     */
    key(key: string | string[]) {
        const _key = Array.isArray(key) ? key[this._mode] : key
        if (!_key) return

        robot.keyToggle(_key, "down")

        const eventCleanups = this.event.emitAsync("key", _key)

        return () => {
            robot.keyToggle(_key, "up")

            eventCleanups.then(cleanups => cleanups.forEach(cleanup => cleanup?.()))
        }
    }

    /**
     * the index if keys (called by `keyboard.key()`) array
     * 
     * @param mode
     * @default 0
     */
    mode(mode: number) {
        this.event.emitAsync("mode", mode)
        this._mode = mode
    }

    /**
     * a helper method of `keyboard.event.on` for chain-method purpose
     * @param event 
     * @param callback 
     * @returns `this` - for chaining purpose
     */
    on<Event extends keyof KeyboardEvents>(event: Event, callback: KeyboardEvents[Event]) {
        this.event.on(event, callback)
        return this
    }
}