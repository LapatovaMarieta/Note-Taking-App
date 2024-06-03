import { Link } from "react-router-dom"

import { Card } from 'antd';

export default function NoteListItem ({
    id,
    title,
    summary,
}) {

    const cardTitle = `Title: ${title}`
    return (
        <Card
        title={cardTitle}
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>Summary: {summary}</p>
        <Link to={`/notes/${id}`} className="details-button">Details</Link>
      </Card>
    );
};