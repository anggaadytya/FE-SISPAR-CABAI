import Card from "react-bootstrap/Card";
import "./CardInfo.css";

function TextExample(props) {
  return (
    <Card className="card-info">
      <Card.Body>
        <Card.Title className="title">{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text className="justify-text textInfo">{props.detail}</Card.Text>
        <Card.Text className="classSolusi1 text-center">Solusi</Card.Text>
        <Card.Text className="justify-text textInfo"> {props.solusi}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TextExample;
