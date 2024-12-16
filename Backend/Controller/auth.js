const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../db/db.js");
const nodemailer = require("nodemailer");

require("dotenv").config();
const router = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
transport.verify((error, success) => {
  if (error) {
    console.error("Error with transport setup:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

router.post("/addEmployee", async (req, res) => {
  const {
    firstName,
    lastName,
    employee_id,
    email,
    phone_number,
    department,
    date_of_joining,
    roles,
  } = req.body;
  try {
    const connectDB = await connection();
    const [existingEmp] = await connectDB.query(
      "SELECT * FROM employee_details WHERE employee_id = ?",
      [employee_id]
    );

    if (existingEmp.length) {
      console.log("already");
      return res
        .status(401)
        .json({ messege: "Already there is a Employee with the same ID" });
    }
    connectDB.query(
      "INSERT INTO employee_details (first_name,last_name,employee_id,email,phone_number,department,date_of_joining,roles) VALUES (?,?,?,?,?,?,?,?)",
      [
        firstName,
        lastName,
        employee_id,
        email,
        phone_number,
        department,
        date_of_joining,
        roles,
      ]
    );
    res.status(200).json({ messege: "Employee Details successfully added!" });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "New Employee Registration",
      text: ` ${firstName} ${lastName} has registered as a new Employee`,
      html: `<h1>Hello from CIT Employee Form</h1><p>new employee...</p><ul><li><span>Employee ID:</span>${employee_id}</li><li><span>Department:</span>${department}</li><li><span>Role:</span>${roles}</li><li><span>Mobile Number:</span>${phone_number}</li></ul>`,
    };
    transport.sendMail(mailOptions, (err, result) => {
      if (err) {
        console.log("error while sending mail", err.message);
      } else {
        console.log(`Email sent Succesfully to ${email}`, result.response);
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ messege: "Error while adding a new employee" });
  }
});
router.get("/getEmployee", async (req, res) => {
  try {
    const connectDB = await connection();
    const [result] = await connectDB.query("SELECT * FROM employee_details");
    if (result.length == 0) {
      console.log(result);
      return res.status(400).json({ messege: "No Data is given Yet!" });
    } else {
      console.log(result);
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ messege: "error catched" });
  }
});
router.get("/create", async (req, res) => {
  try {
    const connectDB = await connection();
    const q =
      "CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE)";
    const result = await connectDB.query(q);

    res.json({ messege: "successsss" });
  } catch (err) {
    console.error(err);
    res.send("error in catch").status(400);
  }
});
module.exports = router;
