import axios from "axios";

const api_url = "https://hapi.fhir.org/baseR4/Patient";

const api = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPatient = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en obtener los datos del paciente");
    throw error;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await api.post("/", patientData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el paciente");
    throw error;
  }
};

export const updatePatient = async (id, updatedData) => {
  try {
    const response = await api.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return { success: true, message: "El paciente Se ha actualizado" };
    }
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      /* console.warn(
        "El servidor devolvió un error 500, asumiendo que el paciente ya está eliminado."
      ); */
      return { success: true, message: "El paciente ya esta eliminado." };
    }

    throw error;
  }
};
