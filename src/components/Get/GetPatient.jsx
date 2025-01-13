import React, { useEffect, useState } from "react";
import { getPatient } from "../../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import ModalComponent from "../../utils/Modal";
import { DeletePatient } from "../Delete/DeletePatient";
import EditPatient from "../Edit/EditPatient";

export const GetPatient = ({ patients, onEditSuccess }) => {
  const [patientData, setPatientData] = useState(patients || []);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  //Modal
  const handleOpen = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  //Delete
  const handleDeleteSuccess = (id) => {
    const updatedPatients = patientData.filter((patient) => patient.id !== id);
    setPatientData(updatedPatients);
  };

  useEffect(() => {
    const patientIds = patients;

    if (patientIds.length > 0) {
      const fetchPatients = async () => {
        try {
          const patientPromises = patientIds.map((id) => getPatient(id));
          const patientsData = await Promise.all(patientPromises);
          setPatientData(patientsData);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener los pacientes:", error);
          setLoading(false);
        }
      };
      fetchPatients();
    } else {
      setLoading(false);
    }
  }, [patients]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (patientData.length === 0) {
    return <div>No se encontraron pacientes creados.</div>;
  }

  return (
    <div>
      <h3>Pacientes Creados</h3>

      <TableContainer component={Paper}>
        <Table stickyHeader size="small" sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Región</TableCell>
              <TableCell>Código Postal</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Button onClick={() => handleOpen(patient)}>
                    {patient?.id || "Dato no disponible"}
                  </Button>
                </TableCell>
                {/*     <TableCell>{patient?.id || "Dato no disponible"}</TableCell> */}
                <TableCell>
                  {patient?.name?.[0]?.given[0] || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.name?.[0]?.family || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.address?.[0]?.line?.join(", ") ||
                    "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.address?.[0]?.city || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.address?.[0]?.state || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.address?.[0]?.postalCode || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.gender === "male"
                    ? "Masculino"
                    : patient?.gender === "female"
                    ? "Femenino"
                    : "Dato no disponible"}
                </TableCell>
                <TableCell>
                  {patient?.birthDate || "Dato no disponible"}
                </TableCell>
                <TableCell>
                  <DeletePatient
                    id={patient.id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>*Para editar un paciente selecciona el ID</p>

      <ModalComponent open={open} onClose={handleClose} title="Editar Paciente">
        {selectedPatient && (
          <EditPatient
            patient={selectedPatient}
            id={selectedPatient.id}
            handleEditSuccess={onEditSuccess}
            onClose={handleClose}
            /*  onEditSuccess={() => {
              console.log("Paciente actualizado");
              handleClose();
            }} */
          />
        )}
      </ModalComponent>
    </div>
  );
};
