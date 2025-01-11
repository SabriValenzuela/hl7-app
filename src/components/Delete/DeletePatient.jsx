import { Button } from "@mui/material";
import { deletePatient } from "../../api";
import Swal from "sweetalert2";

export const DeletePatient = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Este cambio no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });
    console.log(result);

    if (result.isConfirmed) {
      try {
        const response = await deletePatient(id);

        const storedData = JSON.parse(localStorage.getItem("patientIds")) || [];
        const updatedData = storedData.filter((patientId) => patientId !== id);
     
        localStorage.setItem("patientIds", JSON.stringify(updatedData));

        onDeleteSuccess(id);

        Swal.fire({
          icon: "success",
          title: "Borrado",
          text: response.message || "Paciente eliminado exitosamente",
        });
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo borrar el paciente, intente nuevamente.",
        });
      }
    }
  };

  return (
    <Button color="error" variant="contained" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};
