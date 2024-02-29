import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import CreateNote from "./pages/CreateNote";
import EditNotePage from "./pages/EditNotePage";
import NoteInfo from "./pages/NoteInfo";
import NoteLayoutPage from "./pages/NoteLayoutPage";
import NoteListPage from "./pages/NoteListPage";

export interface Tag {
  id: string;
  label: string;
}

export interface NoteDataForStore {
  id: string;
  title: string;
  markDown: string;
  tagIds: string[];
}

export interface NoteFormData {
  // NoteData
  id: string;
  title: string;
  markDown: string;
  tags: Tag[];
}

function App() {
  const [notes, setNotes] = useLocalStorage<NoteDataForStore[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const navigate = useNavigate();

  const notesWithTags = useMemo(() => {
    // get notes
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  const handelCreateNote = ({ tags, ...data }: NoteFormData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const handelUpdateNote = (updatedNote: NoteFormData) => {
  
   const updatedNotes =  notes.map((note):NoteDataForStore => {
      if(note.id == updatedNote.id){
       return {...updatedNote, title: updatedNote.title, markDown: updatedNote.markDown, tagIds:updatedNote.tags.map((tag) => tag.id) }
      }
      return note
    })
    setNotes(updatedNotes);
  };

  const handelAddTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const handelDeleteNote = (id: string) => {
      const filteredNotes = notes.filter((note) => note.id != id)
      setNotes(filteredNotes);
      navigate('/');
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteListPage notes={notesWithTags} tags={tags} />}
        />
        <Route
          path="/create"
          element={
            <CreateNote
              onSubmit={handelCreateNote}
              onAddTag={handelAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/notes/:id" element={<NoteLayoutPage notes={notesWithTags} />}>
          <Route index  element={<NoteInfo onDeleteNote={handelDeleteNote}/>}/>
          <Route
            path="/notes/:id/edit"
            element={
              <EditNotePage
                onUpdated={handelUpdateNote}
                onAddTag={handelAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
