import React from "react";
import DetailsButton from "./DetailsButton";

function UserTile({ User }) {
  return (
    <div
      className="tile"
      style={{
        display: "flex",
        // justifyContent: "space-around",
        alignItems: "center",
        background: "#91a0ab",
        border: "#fff",
        // borderRadius: "130px",
        borderTopLeftRadius: "150px",
        // borderEndLeftRadius: "150px",
        borderBottomLeftRadius: "150px",
        margin: "10px",
        marginLeft:"160px",
        marginRight:"160px",
        padding: "20px",
        boxShadow: "7px 7px 10px rgba(0, 0, 0, 0.5)",  // Subtle shadow for depth

      }}
    >
      <div
        className="img"
        style={{
          width: "140px",
          height: "160px",
          borderRadius: "50%",
          backgroundImage: `url(${process.env.PUBLIC_URL + "/default.png"})`,
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginRight: "20px",
          marginLeft:"15px"
        }}
      ></div>

<div style={userCardStyle}>
      <div>
        <p
          className="name"
          style={{
            fontFamily: "sans-serif",
            fontSize: "40px",
            fontWeight: 'bold',
            margin: 0,  // Remove default margin for clean alignment
            marginBottom: "10px",  // Space between name and other details
          }}
        >
          {User.first_name} {User.last_name}
        </p>

        <p className="details" style={details}>
          <strong>Employee ID: </strong>{User.employee_id}
        </p>
        <p className="details" style={details}>
          <strong>Role: </strong>{User.roles}
        </p>
        <p className="details" style={details}>
          <strong>Email: </strong>{User.email}
        </p>
        <p className="details" style={details}>
          <strong>Phone: </strong>{User.phone_number}
        </p>
      </div>
    </div>
    </div>
  );
}
const details = {
    fontFamily: "Arial, sans-serif",
    fontSize: "18px",
    color: "#333",
    marginBottom: "6px",
  };

  const userCardStyle = {
    // backgroundColor: "#f4f4f4",  // Light gray background
    padding: "2px",              // Padding around the content
    borderRadius: "12px",         // Rounded corners
    width: "300px",               // Fixed width for the card
    margin: "15px",          // Center the card
  };
export default UserTile;
