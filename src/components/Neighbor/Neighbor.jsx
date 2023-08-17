import { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { baseURl } from "../../../constan";


const Neighbors = ({ id_deteksi }) => {
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    fetchNeighbors();
  }, [id_deteksi]);

  const fetchNeighbors = async () => {
    try {
      const response = await fetch(
        `${baseURl}/api/neighbors/${id_deteksi}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const neighborsData = await response.json();
      setNeighbors(neighborsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <span className="span">TOP 3 NeighBors :</span>
      {neighbors.map((neighbor, index) => (
        <InputGroup key={index}>
          <Form.Control
            className="form1 mb-2"
            value={`Neighbor ${index+1}: Kasus ${neighbor.idKasus} - ${neighbor.namaHapen} (Similarity: ${neighbor.similarity})`}
            readOnly
          />
        </InputGroup>
      ))}
    </div>
  );
};

export default Neighbors;
