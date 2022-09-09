export const createChord = (notes: string | string[]) => {
    const chord = Array.isArray(notes) ? notes : [notes]

    return chord.map(note => note.replaceAll(" ", "").toLowerCase()).sort()
}