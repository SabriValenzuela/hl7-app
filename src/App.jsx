import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./assets/hl7-fhir.png";
import "./App.css";
import { GetPatient } from "./components/Get/GetPatient";
import { CreatePatient } from "./components/Create/CreatePatient";
import imghl7 from "./assets/hl7-fhir.png";

function App() {
  const loadPatients = () => {
    const savedPatients = JSON.parse(localStorage.getItem("patientIds")) || [];
    return savedPatients;
  };

  const [patients, setPatients] = useState(loadPatients);

  const addPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient];

    localStorage.setItem("patientIds", JSON.stringify(updatedPatients));

    setPatients(updatedPatients);
  };

  const handleEditSuccess = (updatedPatientData) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === updatedPatientData.id ? updatedPatientData : patient
    );
    localStorage.setItem("patientIds", JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
  };

  return (
    <>
      <img src={imghl7} width={"300px"} />
      <div
      /* style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
        }} */
      >
        <CreatePatient addPatient={addPatient}  />
        <br />
        <GetPatient patients={patients} onEditSuccess={handleEditSuccess} />
      </div>
    </>
  );
}

export default App;
