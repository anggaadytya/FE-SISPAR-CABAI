import Card from "react-bootstrap/Card";
import "./CardInfo.css";

function TextExample(props) {
  return (
    <Card className="card-info">
      <Card.Body>
        <Card.Title
          className="title"
          style={{ color: "chocolate", fontWeight: "bold", fontSize: "24px" }}
        >
          {props.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text className="justify-text">{props.detail}</Card.Text>
        <Card.Text
          clasname=""
          style={{ color: "chocolate", fontSize: "16px", fontWeight: "bold" }}
        >
          Solusi
        </Card.Text>
        <Card.Text className="justify-text"> {props.solusi}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TextExample;
