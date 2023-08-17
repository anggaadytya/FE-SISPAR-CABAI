import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ModalComponent = (props) => {
  const {openModal, selectedData, onCloseModal, onEditData} = props;
  const [editedData, setEditedData] = useState(onEditData);

  useEffect(() => {
    if (selectedData) {
      setEditedData({
        ...selectedData,
      });
    }
  }, [selectedData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "gejala") {
      const gejalaArray = value.split(",").map(item => item.trim());
      setEditedData((prevData) => ({
        ...prevData,
        [name]: gejalaArray,
      }));
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <Dialog open={openModal} onClose={onCloseModal} maxWidth="sm" fullWidth>
      {selectedData ? (
        <div>
          <DialogTitle>Detail Basis Kasus {selectedData.id_basiskasus}</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Id Basis Kasus"
                name="id_basiskasus"
                defaultValue={selectedData.id_basiskasus}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Edit Id Basis Kasus"
                name="id_hapen"
                value={editedData.id_hapen || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edit Gejala"
                name="gejala"
                value={editedData.idGejala || []}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onCloseModal}
              style={{ backgroundColor: " var(--gray)", color: "white" }}
            >
              Kembali
            </Button>
          </DialogActions>
        </div>
      ) : (
        <DialogContent>
          <DialogContentText>Tidak ada data yang dipilih.</DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ModalComponent;
