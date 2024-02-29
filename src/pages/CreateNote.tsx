import { NoteFormData, Tag } from "../App";
import NoteForm from "../components/NoteAddForm";

interface NewNoteProps {
  onSubmit: (data: NoteFormData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}
const CreateNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <NoteForm
      onSubmit={onSubmit}
      onAddTag={onAddTag}
      availableTags={availableTags}
    />
  );
};

export default CreateNote;
