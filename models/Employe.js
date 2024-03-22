const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema(
  {
    image: {
      filename: { type: String },
      mimetype: { type: String },
      path: { type: String },
    },
    name: { type: String },
    designation: { type: String },
    location: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const Employees = mongoose.model("Employe", EmployeesSchema);

module.exports = Employees;
