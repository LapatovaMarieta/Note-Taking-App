import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { Pagination } from 'antd';

import NoteContext from "../../contexts/noteContext";
import NoteListItem from "./note-list-item/NoteListItem";

export default function NoteList () {
    const { getAllNotes } = useContext(NoteContext);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const initialPage = Number(params.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [pageSize] = useState(3);
    const [paginatedNotes, setPaginatedNotes] = useState([]);
    const notes = getAllNotes();

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPaginatedNotes(notes.slice(startIndex, endIndex));
    }, [notes, currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`/notes?page=${page}`);
    };

    return (
        <section id="catalog-page">
            <h1>All Notes</h1>
            {paginatedNotes.map(note => (
                <NoteListItem key={note.id} {...note} />
            ))}

            {notes.length === 0 && (
                <h3 className="no-notes">No Added Notes</h3>
            )}

            {notes.length > pageSize && (
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={notes.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            )}
        </section>
    );
}