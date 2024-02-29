import { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "../components/NoteCard";
import { Tag } from "../App";

export interface  noteWithTags{ 
  id: string,
  title: string,
  markDown: string,
  tagIds: string[]
  tags: Tag[]
} 


interface Props {
  notes: noteWithTags[];
  tags: Tag[];
}
const NoteListPage = ({ notes, tags }: Props) => {
  const [selectedTags, setSelectedTag] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tagIds.some((noteTag) => noteTag == tag.id)
          ))
    );
  }, [notes, title, selectedTags]);

  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col sm={12} md={8}>
          <h1>Note</h1>
        </Col>
        <Col sm={12} md={4}>
          <Stack
            direction="horizontal"
            className="justify-content-center justify-content-md-end"
          >
            <Link to="/create">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" className="ms-1">
              Edit Tag
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                name="colors"
                options={tags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTag(
                    tags.map((tag) => ({ id: tag.value, label: tag.label }))
                  )
                }
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} NoteTags={note.tags}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoteListPage;
