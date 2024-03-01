import noteTaking from "./../assets/note.jpg";
import { Image } from "react-bootstrap";

const CreateNoteBanner = () => {
  return (
    <div className="d-flex flex-column justify-contecnt-center align-items-center mt-5">
      <h1 className="text-center">Create Notes</h1>
      <Image style={{ width: 300, height: 300 }} src={noteTaking} />
    </div>
  );
};

export default CreateNoteBanner;
