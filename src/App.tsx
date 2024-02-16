import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Container } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<>New</>} />
        <Route path="/:id">
          <Route index element={<>Show</>} />
          <Route path="edit" element={<>Edit</>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
