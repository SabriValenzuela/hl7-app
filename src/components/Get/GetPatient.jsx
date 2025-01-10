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
} from "@mui/material";

export const GetPatient = ({ patients }) => {
  const [patientData, setPatientData] = useState(patients || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientIds = patients;

    if (patientIds.length > 0) {
      const fetchPatients = async () => {
        try {
          const patientPromises = patientIds.map((id) => getPatient(id));
          const patientsData = await Promise.all(patientPromises);
          console.log(patientsData);
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
    return <div>No se encontraron pacientes.</div>;
  }

  return (
    <div>
      {/* {patientData.map((patient, index) => (
        <div key={index}>
          <h4>
            Nombre: {patient?.name?.[0]?.given[0] || "Dato no disponible"}
          </h4>
          <h4>
            Apellido: {patient?.name?.[0]?.family || "Dato no disponible"}
          </h4>
          <h4>
            Dirección:{" "}
            {patient?.address?.[0]?.line?.join(", ") || "Dato no disponible"}
          </h4>
          <h4>Ciudad: {patient?.address?.[0]?.city || "Dato no disponible"}</h4>
          <h4>
            Región: {patient?.address?.[0]?.state || "Dato no disponible"}
          </h4>
          <h4>
            Código Postal:{" "}
            {patient?.address?.[0]?.postalCode || "Dato no disponible"}
          </h4>
          <h4>
            Género:{" "}
            {patient?.gender === "male"
              ? "Masculino"
              : patient?.gender === "female"
              ? "Femenino"
              : "Dato no disponible"}
          </h4>
          <h4>
            Fecha de Nacimiento: {patient?.birthDate || "Dato no disponible"}
          </h4>
        </div>
      ))} */}

      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table stickyHeader>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{patient?.id || "Dato no disponible"}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
