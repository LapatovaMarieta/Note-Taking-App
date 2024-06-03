import { useContext, useEffect } from "react";

import { Button, Form, Input } from 'antd';

import useForm from "../../hooks/useForm";
import NoteContext from "../../contexts/noteContext";

const NoteFormKeys = {
    Title: 'title',
    Summary: 'summary'
};

const initialFormValues = {
    [NoteFormKeys.Title]: '',
    [NoteFormKeys.Summary]: '',
};

export default function NoteCreate() {
    const { createNoteSubmitHandler } = useContext(NoteContext);
    const [form] = Form.useForm();
    const { values, onChange, onSubmit } = useForm(createNoteSubmitHandler, initialFormValues);

    useEffect(() => {
        form.setFieldsValue(values);
    }, [values, form]);

    return (
        <section id="create-page" className="auth">
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onSubmit}
                size="default"
                style={{
                    maxWidth: 600,
                }}
            >
                <div className="container">
                    <h1>Create Note</h1>
                    <Form.Item label="Note title:" name={NoteFormKeys.Title}>
                        <Input 
                            type="text" 
                            id="title" 
                            name={NoteFormKeys.Title} 
                            value={values[NoteFormKeys.Title]} 
                            onChange={onChange} 
                            placeholder="Enter note title..." 
                        />
                    </Form.Item>
                    <Form.Item label="Summary" name={NoteFormKeys.Summary}>
                        <Input.TextArea 
                            showCount 
                            maxLength={300} 
                            name={NoteFormKeys.Summary} 
                            value={values[NoteFormKeys.Summary]} 
                            onChange={onChange} 
                            id="summary" 
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">Create Note</Button>
                    </Form.Item>
                </div>
            </Form>
        </section>
    );
};