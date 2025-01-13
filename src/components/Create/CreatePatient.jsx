import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { createPatient } from "../../api";
import regionesData from "../../utils/regionesData";
import Swal from "sweetalert2";

export const CreatePatient = ({ addPatient }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    genero: "",
    direccion: "",
    fechaNacimiento: "",
    ciudad: "",
    region: "",
    codigoPostal: "",
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
    return Object.keys(validationErrors).length === 0; // Retorna true si no hay errores
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
      name: [
        {
          use: "official",
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
      const response = await createPatient(patientData);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Paciente creado exitosamente",
      });
      setFormData({
        nombres: "",
        apellidos: "",
        genero: "",
        direccion: "",
        fechaNacimiento: "",
        ciudad: "",
        region: "",
        codigoPostal: "",
      });
      console.log("Paciente creado exitosamente:", response);
      addPatient(response.id);
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el paciente, intente nuevamente",
      });
    }
  };

  return (
    <div>
      <div>
        <h3>Crear Paciente</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombres"
                variant="outlined"
                name="nombres"
                fullWidth
                value={formData.nombres}
                onChange={handleChange}
                error={!!errors.nombres}
                helperText={errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellidos"
                variant="outlined"
                name="apellidos"
                fullWidth
                value={formData.apellidos}
                onChange={handleChange}
                error={!!errors.apellidos}
                helperText={errors.apellidos}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="gen">Género</InputLabel>
                <Select
                  labelId="gen"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  error={!!errors.genero}
                >
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="female">Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                variant="outlined"
                name="direccion"
                fullWidth
                value={formData.direccion}
                onChange={handleChange}
                error={!!errors.direccion}
                helperText={errors.direccion}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                name="fechaNacimiento"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={formData.fechaNacimiento}
                onChange={handleChange}
                error={!!errors.fechaNacimiento}
                helperText={errors.fechaNacimiento}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                variant="outlined"
                name="ciudad"
                fullWidth
                value={formData.ciudad}
                onChange={handleChange}
                error={!!errors.ciudad}
                helperText={errors.ciudad}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="region">Región</InputLabel>
                <Select
                  labelId="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  error={!!errors.region}
                >
                  {regionesData.regiones.map((reg, index) => (
                    <MenuItem key={index} value={reg.region}>
                      {reg.region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Postal"
                variant="outlined"
                name="codigoPostal"
                fullWidth
                value={formData.codigoPostal}
                onChange={handleChange}
                error={!!errors.codigoPostal}
                helperText={errors.codigoPostal}
              />
            </Grid>
          </Grid>
          <Button
            size="medium"
            type="submit"
            variant="contained"
            sx={{
              margin: "20px 200px",
            }}
          >
            Guardar Paciente
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
