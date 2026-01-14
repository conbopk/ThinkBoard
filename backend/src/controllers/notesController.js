import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        res.status(200).json(notes);
    } catch (e) {
        console.error("Error in getAllNotes controller", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found!" })

        res.json(note);
    } catch (e) {
        console.error("Error in getNoteById controller", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({message: "Title and content are required"});
        }

        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (e) {
        console.error("Error in createNote controller", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;

        if (!title || !content) {
            return res.status(400).json({message: "Title and content are required"});
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: title,
                content: content
            },
            {
                new: true,
            }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (e) {
        console.error("Error in updateNote controller", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) res.status(404).json({ message: "Note not found" });

        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (e) {
        console.error("Error in deleteNote controller", e);
        res.status(500).json({ message: "Internal server error" });
    }
}