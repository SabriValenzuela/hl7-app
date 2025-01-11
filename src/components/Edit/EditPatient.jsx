import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from "@mui/material";

import Swal from "sweetalert2";
import { updatePatient } from "../../api";
import regionesData from "../../utils/regionesData";

const EditPatient = ({ patient, id, handleEditSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    nombres: patient?.name?.[0]?.given[0],
    apellidos: patient?.name?.[0]?.family,
    genero: patient?.gender,
    direccion: patient?.address?.[0]?.line?.join(", "),
    fechaNacimiento: patient?.birthDate,
    ciudad: patient?.address?.[0]?.city,
    region: patient?.address?.[0]?.state,
    codigoPostal: patient?.address?.[0]?.postalCode,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.nombres.trim())
      validationErrors.nombres = "Nombres es obligatorio";
    if (!formData.apellidos.trim())
      validationErrors.apellidos = "Apellidos es obligatorio";
    if (!formData.genero)
      validationErrors.genero = "Debe seleccionar un género";
    if (!formData.direccion.trim())
      validationErrors.direccion = "Dirección es obligatoria";
    if (!formData.fechaNacimiento)
      validationErrors.fechaNacimiento = "Fecha de nacimiento es obligatoria";
    if (!formData.ciudad.trim())
      validationErrors.ciudad = "Ciudad es obligatoria";
    if (!formData.region)
      validationErrors.region = "Debe seleccionar una región";
    if (!formData.codigoPostal || isNaN(formData.codigoPostal)) {
      validationErrors.codigoPostal = "Código postal debe ser un número válido";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete todos los campos obligatorios.",
      });
      return;
    }

    const patientData = {
      resourceType: "Patient",
      id: id,
      name: [
        {
          use: "usual",
          family: formData.apellidos,
          given: [formData.nombres],
        },
      ],
      gender: formData.genero.toLowerCase(),
      birthDate: formData.fechaNacimiento,
      address: [
        {
          use: "home",
          line: [formData.direccion],
          city: formData.ciudad,
          state: formData.region,
          postalCode: formData.codigoPostal,
        },
      ],
    };

    try {
      const response = await updatePatient(id, patientData);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Paciente actualizado exitosamente.",
      });

      if (handleEditSuccess) {
        handleEditSuccess(patientData);
      }

      onClose();

      /*  if (onEditSuccess) onEditSuccess(); */
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el paciente. Intente nuevamente.",
      });
    }
  };

  return (
    <div>
      <h4>
        ID:<span> {id}</span>
      </h4>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Nombres"
            variant="outlined"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            error={!!errors.nombres}
            helperText={errors.nombres}
            sx={{ margin: "10px" }}
          />
          <TextField
            label="Apellidos"
            variant="outlined"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            error={!!errors.apellidos}
            helperText={errors.apellidos}
            sx={{ margin: "10px" }}
            required
          />
          <FormControl>
            <InputLabel id="gen">Género</InputLabel>
            <Select
              labelId="gen"
              label="Genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              error={!!errors.genero}
              sx={{ margin: "10px" }}
            >
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Femenino</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Dirección"
            variant="outlined"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            error={!!errors.direccion}
            helperText={errors.direccion}
            sx={{ margin: "10px" }}
          />
          <TextField
            label="Fecha de nacimiento"
            type="date"
            name="fechaNacimiento"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.fechaNacimiento}
            onChange={handleChange}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento}
            sx={{ margin: "10px" }}
          />
          <TextField
            label="Ciudad"
            variant="outlined"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            error={!!errors.ciudad}
            helperText={errors.ciudad}
            sx={{ margin: "10px" }}
          />
          <FormControl>
            <InputLabel id="Region">Región</InputLabel>
            <Select
              labelId="Region"
              label="Región"
              name="region"
              value={formData.region}
              onChange={handleChange}
              error={!!errors.region}
              sx={{ margin: "10px" }}
            >
              {regionesData.regiones.map((reg, index) => (
                <MenuItem key={index} value={reg.region}>
                  {reg.region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Código Postal"
            variant="outlined"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            error={!!errors.codigoPostal}
            helperText={errors.codigoPostal}
            sx={{ margin: "10px" }}
          />
          <Button type="submit" variant="contained">
            Actualizar Paciente
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default EditPatient;
