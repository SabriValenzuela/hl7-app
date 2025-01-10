import { Button } from "@mui/material";
import { deletePatient } from "../../api";
import Swal from "sweetalert2";

export const DeletePatient = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      try {
        await deletePatient(id);
        onDeleteSuccess(id);
        Swal.fire({
          icon: "success",
          title: "Borrado",
          text: "Paciente eliminado exitosamente",
        });
        alert("Paciente eliminado con éxito.");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo borrar el paciente, intente nuevamente",
        });
        console.error(error);
      }
    }
  };

  return (
    <Button color="error" variant="contained" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};
