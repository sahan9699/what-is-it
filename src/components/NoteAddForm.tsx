import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteFormData, Tag } from "../App";
import {v4 as uuidV4} from "uuid";

type Props = {
  onSubmit: (note: NoteFormData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[]
} & Partial<NoteFormData>


const NoteForm = ({onSubmit, onAddTag, availableTags} : Props) => { 
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: uuidV4(),
      title: titleRef.current!.value,
      markDown: markDownRef.current!.value,
      tags: selectedTag
    })
    navigate('..');
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect 
                onCreateOption={label => {
                  const newTag = {id: uuidV4(), label}
                  onAddTag(newTag);
                  setSelectedTag(prev => [...prev, newTag])
                }}
                options={availableTags.map(tag => ({
                  label: tag.label, value: tag.id  
                }))}
                value={selectedTag.map(tag => ({label: tag.label, value: tag.id }))} 
                onChange={tags => {
                setSelectedTag(tags.map(tag => ({
                  label: tag.label,
                  id: tag.value
                })))
              }} isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required ref={markDownRef}  as="textarea" rows={15}/>
        </Form.Group>
      </Stack>
      <Stack gap={1} className="mt-2 justify-content-end" direction="horizontal">
        <Link to='../'>
            <Button type="button" variant="outline-secondary" className="me-3">Cancel</Button>     
        </Link>
        <Button type="submit">Save</Button>
      </Stack>
    </Form>
  );
};

export default NoteForm;
