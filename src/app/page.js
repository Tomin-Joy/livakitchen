"use client";
import { useState } from "react";
import AlertDialog from "./alertDialog";
import useKeyPress from "../../hooks/keypress";
import "./style.css";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useKeyPress(() => {
    setIsDialogOpen(true);
    console.log("Authentication ");
  });

  async function formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch("/api/process", {
        method: "post",
        body: formData,
      });

      if (response.ok) {
        e.target.reset();
      }
      console.log(await response.json());
    } catch (error) {
      console.log(error);

      alert("Error occured contact administrator");
    }
  }
  return (
    <>
      <AlertDialog
        isOpenVal={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="form-container">
          <style>
    .logo-container {
      text-align: center;
      margin: 20px 0; /* Optional: adds some space above and below */
    }
    .logo {
      width: 150px; /* Adjust the logo size as needed */
    }
  </style>
</head>
<body>
  <div class="logo-container">
    <img src="https://res.cloudinary.com/dhplt9h4t/image/upload/v1728145804/logo-2_cw3qqp.png" alt="Company Logo" class="logo"/>
          <img src="https://res.cloudinary.com/dhplt9h4t/image/upload/v1728145804/logo-2_cw3qqp.png" alt="Company Logo" class="logo"/>
        <h2>Client Information Form</h2>
        <form onSubmit={formSubmit}>
          <div className="form-group">
            <label htmlFor="client_name">Name:</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="client_location">Location:</label>
            <input
              type="text"
              id="client_location"
              name="client_location"
              placeholder="Enter customer location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="client_email">Email:</label>
            <input
              type="email"
              id="client_email"
              name="client_email"
              placeholder="Enter customer email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service_type">Service Type:</label>
            <select id="service_type" name="service_type" required>
              <option value="" hidden>
                Select Service Type
              </option>

              <option value="interior_design">Full Home Interior </option>
              <option value="kitchen_design">Modular Kitchen</option>
              <option value="furniture_design">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="budget_range">Budget Range:</label>
            <select id="budget_range" name="budget_range" required>
              <option value="" hidden>
                Added From Which Showroom
              </option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Banglore">Banglore</option>
              <option value="Palakad">Palakad</option>
              <option value="Mysore">Mysore</option>
            </select>
          </div>

          <button type="submit" className="submit-btn button">
            Submit
          </button>
        </form>
        <div className="footer">
          <p>Made with ❤ by Liva Kitchens And Interiors </p>
        </div>
      </div>
    </>
  );
}
