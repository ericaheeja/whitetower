import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./App.css";

function MedicalStaff() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updateNum, setUpdateNum] = useState("");
  const [list, setList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setselectedPatient] = useState("");
  const [patientID, setPatientId] = useState("");
  const [patientState, setPatientState] = useState("");

  useEffect(() => {
    const getPatient = () => {
      Axios.get("https://yongjuleehome.ga/4537/termproject/API/V1/patientList").then((response) => {
        setPatientList(response.data);
        console.log(response.data);
      });
    };
    getPatient();
  }, []);

  const RegisterRequest = () => {
    console.log(startTime.split(" ")[1]);
    console.log(endDate + " " + endTime);
    if (name === "" || position === "" || endDate === "" || endTime === "") {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      Axios.put("https://yongjuleehome.ga/4537/termproject/API/V1/updateReserved", {
        patientID: patientID,
        name: name,
        position: position,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      }).then((response) => {
        console.log(response);
        console.log("line55");
        Axios.post("https://yongjuleehome.ga/4537/termproject/API/V1/post/medicalStaff", {
          name: name,
          position: position,

          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          patientID: patientID,
        }).then((response) => {
          console.log(response);
        });
      });

      window.location.reload(false);
      GetMedicalStaff();
    }
  };

  const UpdateMedicalStaff = () => {
    if (name === "" || position === "" || endDate === "" || endTime === "") {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      Axios.put("https://yongjuleehome.ga/4537/termproject/API/V1/put/medicalStaff", {
        name: name,
        position: position,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        updateNum: updateNum,
        patientID: patientID,
      }).then((response) => {
        console.log(response);
      });
      // GetMedicalStaff()
    }
  };

  const GetMedicalStaff = () => {
    Axios.get("https://yongjuleehome.ga/4537/termproject/API/V1/get/medicalStaff", {
      name: name,
      position: position,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      patientID: patientID,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data[0].start_at);
      setList(response.data);
    });
  };

  const DeleteMedicalStaff = () => {
    console.log("line107");

    Axios.put("https://yongjuleehome.ga/4537/termproject/API/V1/updateNotReserved", {
      patientID: patientID,
    }).then((response) => {
      console.log(response);
      console.log("line 108 delete");

      Axios.delete("https://yongjuleehome.ga/4537/termproject/API/V1/delete/medicalStaff", {
        data: {
          updateNum: updateNum,
        },
      }).then((response) => {
        console.log(response);
      });
    });
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <>
          <Header />
          <div className="d-flex justify-content-center p-5">
            <div className="createScehdule">
              <div className="d-flex justify-content-center ">
                <h3>Create Schedule</h3>
              </div>

              <form className="d-flex justify-content-center">
                <div className="form-row w-50 mx-3">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">Staff Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName4"
                      placeholder="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPosition4">Position</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPosition4"
                      placeholder="position"
                      onChange={(e) => {
                        setPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    {/* <label htmlFor="inputPosition4">Select Patient</label> */}
                    <Dropdown>
                      <span>Select patient: </span>

                      <Dropdown.Toggle variant="success btn-sm" id="dropdown-basic">
                        Patient Id
                      </Dropdown.Toggle>
                      <br />

                      <Dropdown.Menu variant="secondary btn-sm" id="dropdown-basic">
                        {patientList &&
                          patientList.map((patient, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={(e) => {
                                setselectedPatient(patient.date);
                                setStartTime(patient.date);
                                setPatientId(patient.ID);
                                setPatientState(patient.reservedState);
                              }}
                            >
                              {" "}
                              Patient#: {patient.ID}
                              <span>
                                {patient.reservedState === 1 ? (
                                  <p>Reserved</p>
                                ) : (
                                  <p>Not Reserved</p>
                                )}
                              </span>
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">Start Date:</label>
                    {selectedPatient}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">End Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    />
                    <input
                      type="time"
                      className="form-control"
                      onChange={(e) => {
                        setEndTime(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">Update Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setUpdateNum(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>

              <br />
              <br />
              <div className="d-flex justify-content-center">
                <Button className="btn btn-success btn-sm mr-3" onClick={GetMedicalStaff}>
                  View Schedule
                </Button>
                <Button className="btn btn-primary btn-sm mr-3" onClick={RegisterRequest}>
                  Add Schedule
                </Button>
                <Button className="btn btn-secondary btn-sm mr-3" onClick={UpdateMedicalStaff}>
                  Update Schedule
                </Button>
                <Button className="btn btn-info btn-sm mr-3" onClick={DeleteMedicalStaff}>
                  Delete Schedule
                </Button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="schedule">
              <div>{list.position}</div>
              <div className="d-flex justify-content-center">
                <h3>Schedule list</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Po
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      ST Date
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Ed Date
                    </th>
                    <th scope="col"># Patient</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((li) => (
                    <>
                      <tr>
                        <td>{li.Id}</td>
                        <td>{li.name}</td>
                        <td>{li.position}</td>
                        <td>{li.start_at}</td>
                        <td>{li.end_at}</td>
                        <td style={{ textAlign: "center" }}>{li.patientID}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        (window.location.href = "/")
      )}
    </div>
  );
}

export default MedicalStaff;
