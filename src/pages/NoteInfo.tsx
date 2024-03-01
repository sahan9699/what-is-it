import React, { useContext, useState } from "react";
import { noteWithTags } from "./NoteListPage";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import EditTagModal from "../components/EditTagModal";
import { Tag } from "../App";

interface Props {
  tags: Tag[]
  onDeleteNote: (noteId: string) => void;
}

const NoteInfo = ({onDeleteNote, tags}: Props) => {

  const selectedNote = useOutletContext<noteWithTags>();


  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{selectedNote.title}</h1>
          {selectedNote.tags.length != 0 &&
            selectedNote.tags.map((tag) => (
              <Badge className="text-trancate mx-1" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
        </Col>
        <Col sm={12} md={4}>
          <Stack
            gap={1}
            direction="horizontal"
            className="justify-content-center justify-content-md-end"
          >
            <Link to={`/notes/${selectedNote.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
              <Button variant="outline-danger" onClick={() => onDeleteNote(selectedNote.id)}>Delete</Button>
            <Link to="..">
              <Button variant="outline-secondary" className="ms-1">
                back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{selectedNote.markDown}</ReactMarkdown>
     
    </>
  );
};
export function useNote() {
  return useOutletContext<noteWithTags>();
}

export default NoteInfo;
