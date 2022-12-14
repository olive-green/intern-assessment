import React, { useState, useEffect } from "react";
import {
  validateAge,
  validateEmail,
  validateName,
} from "../function/functions";

import "../styles/Form.css";
function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [batchNumber, setBatchNumber] = useState();
  const [gender, setGender] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);
  const SaveData = () => {
    //Changing startdate format to mm/dd/year
    var err = "";

    if (!validateEmail(email)) {
      err += "Email is Not valid\n";
    }

    if (!validateName(name)) {
      err += "Name is not valid\n";
    }

    if (!validateAge(age)) {
      err += "Age must lie between 18 and 65\n";
    }
    if (err.length == 0) {
      var newStartDate = "";
      newStartDate +=
        startDate[5] +
        startDate[6] +
        "/" +
        startDate[8] +
        startDate[9] +
        "/" +
        startDate.substr(0, 4);

      //Store the data on the database by calling the REST API
      // fetch("https://flexmoneyserver-production.up.railway.app/user", {
        fetch("http://localhost:8000/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: Number(age),
          email: email,
          gender: gender,
          startDate: newStartDate,
          feesPaid: 500,
          batchNumber: batchNumber,
        }),
      })
        .then((response) => response.json())
        //Response from the REST API
        .then((responseData) => {
          const message_id = responseData.message_id;

          //If successful updation is there or successfull insertion is there
          if (message_id == "1" || message_id == "3"||message_id == "2") {
            //Store the information locally to be used later
            localStorage.setItem("name", name);
            localStorage.setItem("age", Number(age));
            localStorage.setItem("email", email);
            localStorage.setItem("startDate", newStartDate);
            localStorage.setItem("batchNumber", batchNumber);
            //Move to the payment dialogue box
            document.querySelector(".formContainer").style.display = "none";
            document.querySelector(".paymentContainer").style.display = "flex";
          }
          //Else anything else happens then create a mockup box
          else {
            const message = responseData.message;
            window.alert(message);
            //If plan is active then simply reload the application
            if (message_id == "2") {
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          console.log(`Error in accessing the server is ${err}`);
        });
    }
    else alert('There were some errors in the filling of form:-\n' + err)
  };
  const handleNameChange = (b) => {
    setName(b);
  };
  const handleEmailChange = (b) => {
    setEmail(b);
  };
  const handleAgeChange = (b) => {
    setAge(b);
  };

  return (
    <div className="form-container" >
      <div className="form-group">
        <label className="form-label" for="name">Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          autocomplete="off"
        />
      </div>
      <div className="form-group">
        <label className="form-label" for="age">Age</label>
        <input
          type="number"
          className="form-input"
          value={age}
          onChange={(e) => handleAgeChange(e.target.value)}
          min="18"
          max="65"
        />
      </div>
      <div className="form-group">
        <label className="form-label" for="gender">Gender</label>
        <select className="form-input" onChange={(e) => setGender(e.target.value)}> 
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" for="email">E-mail</label>
        <input type="email" className="form-input" value={email} onChange={(e) => handleEmailChange(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label" for="startDate">Starting date</label>
        <input type="date" className="form-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label" for="batchNumber">Batch Number</label>
        <select className="form-input" onChange={(e) => setBatchNumber(e.target.value)}>
          <option value="1">6-7AM</option>
          <option value="2">7-8AM</option>
          <option value="3">8-9AM</option>
          <option value="4">5-6PM</option>

        </select>
      </div>
      <div className="form-group">
        <button className="form-button" onClick={SaveData}>Submit</button>
      </div>
    </div>
  );
}

export default Form;
