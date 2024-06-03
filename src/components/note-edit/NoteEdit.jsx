import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input } from 'antd';

import NoteContext from "../../contexts/noteContext";

const NoteFormKeys ={
    Title: 'title',
    Summary: 'summary'
}

export default function NoteEdit () {
    const navigate = useNavigate();
    const { noteId } = useParams() ;
    const { getOneNote, updateNote } = useContext(NoteContext);
    const [note, setNote] = useState({
        [NoteFormKeys.Title]: '',
        [NoteFormKeys.Summary]: '',
    });
    const [form] = Form.useForm();

    useEffect(() => {
        const existingNote = getOneNote(noteId);
        if (existingNote) {
            setNote(existingNote);
            form.setFieldsValue(existingNote);
        }
    }, [noteId, getOneNote, form]);

    
    const editNoteSubmitHandler = (values) => {
        updateNote(noteId, values);
        navigate('/notes');
    }

    return(
        <section id="edit-page">
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={note}
                onFinish={editNoteSubmitHandler}
                size= "default"
                style={{
                    maxWidth: 600,
                }}
            >
                <div className="container">

                    <h1>Edit Note</h1>
                    <Form.Item label="Note title:" name={NoteFormKeys.Title}>
                        <Input type="text" id="title" name={NoteFormKeys.Title} placeholder="Enter note title..." />
                    </Form.Item>
                    <Form.Item label="Summary" name={NoteFormKeys.Summary}>
                        <Input.TextArea showCount maxLength={300} name={NoteFormKeys.Summary} id="summary"></Input.TextArea>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit"> Save </ Button>
                    </Form.Item>
                </div>
            </Form>
        </section>
    );
};