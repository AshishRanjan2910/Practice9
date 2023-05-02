import Button from "./UI/Button/Button";
import Card from "./UI/Card/Card";
import React, { useEffect, useState } from "react";
import "./Form.css";

const Form = () => {
  const [userState, setUserState] = useState({
    userDetails: null,
    updatedUserDetails: null,
    isEditMode: false,
  });

  useEffect(() => {
    fetch("https://run.mocky.io/v3/a2eebe62-c28f-478d-a8e3-523e589eb31f")
      .then((response) => response.json())
      .then((data) => {
        setUserState({ userDetails: data });
      });
  }, []);

  const handleEditClick = () => {
    setUserState((prevState) => {
      return {
        ...prevState,
        isEditMode: true,
        updatedUserDetails: { ...prevState.userDetails },
      };
    });
  };

  const inputChangeHandler = (event) => {
    if (!event.target.name.includes(".")) {
      const { name, value } = event.target;
      setUserState((prevState) => ({
        ...prevState,
        updatedUserDetails: {
          ...prevState.updatedUserDetails,
          [name]: value,
        },
      }));
    } else {
      const { name, value } = event.target;
      const path = name.split(".");
      setUserState((prevState) => {
        return {
          ...prevState,
          updatedUserDetails: {
            ...prevState.updatedUserDetails,
            [path[0]]: {
              ...prevState.updatedUserDetails[path[0]],
              [path[1]]: value,
            },
          },
        };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("https://run.mocky.io/v3/a2eebe62-c28f-478d-a8e3-523e589eb31f", {
      method: "POST",
      body: JSON.stringify(userState.updatedUserDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
      })
      .then((data) => {
        setUserState((prevState) => {
          return {
            userDetails: { ...prevState.updatedUserDetails },
            isEditMode: false,
            updatedUserDetails: null,
          };
        });
      })
      .catch((error) => {
        setUserState((prevState) => {
          return {
            userDetails: { ...prevState.updatedUserDetails },
            isEditMode: false,
            updatedUserDetails: null,
          };
        });
        console.error("Err! ", error);
      });
  };

  const { userDetails, updatedUserDetails, isEditMode } = userState;

  if (!userDetails) {
    return <div>Please wait...</div>;
  }

  return (
    <Card>
      <img src={userDetails.avatar} alt={"avatar"} className="avatar" />
      <h2>User Profile</h2>
      {isEditMode ? (
        <form className="update-user__controls" onSubmit={submitHandler}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={updatedUserDetails.first_name}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={updatedUserDetails.last_name}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={updatedUserDetails.username}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUserDetails.email}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="avatar">Avatar Link:</label>
          <input
            type="link"
            name="avatar"
            value={updatedUserDetails.avatar}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="gender">Gender:</label>
          <input
            type="gender"
            name="gender"
            value={updatedUserDetails.gender}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={updatedUserDetails.phone_number}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={updatedUserDetails.date_of_birth}
            min="1900-01-01"
            max="2023-12-31"
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="employment.title">Employment Title:</label>
          <input
            type="text"
            name="employment.title"
            value={updatedUserDetails.employment.title}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="employment.key_skill">Key Skills:</label>
          <textarea
            type="text"
            name="employment.key_skill"
            value={updatedUserDetails.employment.key_skill}
            onChange={inputChangeHandler}
          />
          <br />
          <h3>Address: </h3>
          <label htmlFor="address.street_name">Street Name:</label>
          <input
            type="text"
            name="address.street_name"
            value={updatedUserDetails.address.street_name}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="address.street_address">Street Address:</label>
          <input
            type="text"
            name="address.street_address"
            value={updatedUserDetails.address.street_address}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="address.city">City:</label>
          <input
            type="text"
            name="address.city"
            value={updatedUserDetails.address.city}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="address.state">State:</label>
          <input
            type="text"
            name="address.state"
            value={updatedUserDetails.address.state}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="address.country">Country:</label>
          <input
            type="text"
            name="address.country"
            value={updatedUserDetails.address.country}
            onChange={inputChangeHandler}
          />
          <br />
          <label htmlFor="address.zip_code">Zip Code:</label>
          <input
            type="num"
            name="address.zip_code"
            value={updatedUserDetails.address.zip_code}
            onChange={inputChangeHandler}
          />
          <br />
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <div className="show-user__controls">
          <p>
            <strong>Name:</strong> {userDetails.first_name}{" "}
            {userDetails.last_name}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Gender:</strong> {userDetails.gender}
          </p>
          <p>
            <strong>Phone Number:</strong> {userDetails.phone_number}
          </p>
          <p>
            <strong>Date of Birth:</strong> {userDetails.date_of_birth}
          </p>
          <p>
            <strong>Employment Title:</strong> {userDetails.employment.title}
          </p>
          <p>
            <strong>Key Skills:</strong> {userDetails.employment.key_skill}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address.street_name},{" "}
            {userDetails.address.street_address}, {userDetails.address.city},{" "}
            {userDetails.address.state}, {userDetails.address.country}
            <br /> zip code: {userDetails.address.zip_code}
          </p>
          <Button onClick={handleEditClick}>Edit</Button>
        </div>
      )}
    </Card>
  );
};

export default Form;
