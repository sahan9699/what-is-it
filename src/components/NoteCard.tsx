import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import styles from "./../css/noteList.module.css";

interface Props {
  id: string;
  title: string;
  NoteTags: Tag[];
}
const NoteCard = ({ id, title, NoteTags }: Props) => {
  return (
    <Card
      as={Link}
      to={`notes/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {NoteTags.length != 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flrx-wrap"
            >
              {NoteTags.map((tag) => (
                <Badge className="text-trancate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
