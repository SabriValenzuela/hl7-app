import {
  Button,
  FormControl,
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
    codigoPostal: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        title: "Exito!",
        text: "Paciente Creado exitosamente",
      });
      setFormData({
        nombres: "",
        apellidos: "",
        genero: "",
        direccion: "",
        fechaNacimiento: "",
        ciudad: "",
        region: "",
        codigoPostal: 0,
      });
      console.log("Paciente creado exitosamente:", response);

      addPatient(response.id);

      //alert("Paciente creado exitosamente");
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el paciente, intente nuevamente",
      });
      //  alert("Error al crear el paciente");
    }
  };

  return (
    <div
   
    >
      <div>
        <h3>Crear Paciente</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Nombres"
            variant="outlined"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            sx={{ margin: "10px" }}
          />
          <TextField
            label="Apellidos"
            variant="outlined"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            sx={{ margin: "10px" }}
          />

          <FormControl />
          <FormControl>
            <Select
              labelId="gen"
              label="Genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              sx={{ margin: "10px" }}
            >
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Femenino</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              label="Dirección"
              variant="outlined"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              sx={{ margin: "10px" }}
            ></TextField>
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
              sx={{ margin: "10px" }}
            />
            <TextField
              label="Ciudad"
              id="Ciudad"
              variant="outlined"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              sx={{ margin: "10px" }}
            />
          </FormControl>
          <FormControl>
            <Select
              labelId="Region"
              label="Región"
              name="region"
              value={formData.region}
              onChange={handleChange}
              sx={{ margin: "10px" }}
            >
              {regionesData.regiones.map((reg, index) => (
                <MenuItem key={index} value={reg.region}>
                  {reg.region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              label="Codigo Postal"
              variant="outlined"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              sx={{ margin: "10px" }}
            />
          </FormControl>

          <Button type="submit" variant="contained">
            Guardar Paciente
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
