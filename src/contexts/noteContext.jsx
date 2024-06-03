import { createContext  } from "react"
import { useNavigate} from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid';

import usePersistedState from "../hooks/usePersistedState";

const NoteContext = createContext();

export const NoteProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [notes, setNotes] = usePersistedState('notes', []);

    const createNoteSubmitHandler = (newNote) => {
        const noteWithId = { ...newNote, id: uuidv4() };
        const updatedNotes = [...notes, noteWithId];
        setNotes(updatedNotes);
        
        const pageSize = 3;
        const allNotes = notes.length + 1;
        const newPage = Math.ceil(allNotes/ pageSize);
        console.log(newPage) // Изчислява новата страница
        navigate(`/notes?page=${newPage}`);
    };

    const getAllNotes = () => {
        return notes;
    };

    const getOneNote = (id) => {
        const note = notes.find(note => note.id === id);

        return note;
    };

    const updateNote = (id, updatedNote) => {
        const updatedNotes = notes.map(note => note.id === id ? { ...note, ...updatedNote } : note);
        setNotes(updatedNotes);
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    const values = {
        createNoteSubmitHandler,
        getAllNotes,
        getOneNote,
        updateNote,
        deleteNote,
        noteId: notes.noteId,
        noteTitle: notes.title,
        noteSummary: notes.summary,
    };

    return (
        <NoteContext.Provider value={values}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContext.displayName = 'NoteContext';

export default NoteContext;