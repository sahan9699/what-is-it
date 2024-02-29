import { useOutletContext } from "react-router-dom";
import { NoteFormData, Tag } from "../App";
import { noteWithTags } from "./NoteListPage";
import NoteEditForm from "../components/NoteEditForm";

interface Props {
  onUpdated: (note: NoteFormData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const EditNotePage = ({ onUpdated, onAddTag, availableTags }: Props) => {
  const selectedNote = useOutletContext<noteWithTags>();
  return (
    <>
      <NoteEditForm
        onUpdate={onUpdated}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={selectedNote.title}
        markDown={selectedNote.markDown}
        tags={selectedNote.tags}
        id={selectedNote.id}
      />
    </>
  );
};

export default EditNotePage;
