import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Modal, Button } from 'antd';

import NoteContext from "../../contexts/noteContext";

import Path from "../../paths";
import { pathToUrl } from "../../utils/pathUtils";

export default function NoteDetails () {
    const { getOneNote, deleteNote, getAllNotes } = useContext(NoteContext);
    const { noteId } = useParams();
    const [note, setNote] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchedNote = getOneNote(noteId);
        setNote(fetchedNote);
    }, [noteId, getOneNote]);

    const handleDelete = () => {
        deleteNote(noteId);
        const notes = getAllNotes();
        const totalNotes = notes.length - 1;
        const pageSize = 3;
        const totalPages = Math.ceil(totalNotes / pageSize);
        navigate(`/notes?page=${totalPages}`);
    };


    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Are you sure delete this note?',
            content: 'This action cannot be undone.',
            onOk() {
                handleDelete();
            },
        });
    }

    return (
        <section id="details">
            <h1>Note Details</h1>
            { note ? (<div className="info-section">

                <div className="header">
                    <h1>{note.title}</h1>
                </div>

                <p className="text">
                    {note.summary}
                </p>

                <div className="buttons">
                    <Link to={pathToUrl(Path.NoteEdit, { noteId:note.id })} className="button">Edit</Link>
                    <Button type="danger" onClick={showDeleteConfirm} className="button">Delete</Button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    )
}