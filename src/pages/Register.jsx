import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register.css"; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    officialName: "",
    organizationType: "",
    yearOfEstablishment: "",
    registrationNumber: "",
    affiliatedBody: "",
    officialEmail: "",
    officialContact: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    authorizedPersonName: "",
    designation: "",
    authorizedEmail: "",
    authorizedContact: "",
    natureOfServices: "",
    totalStaff: "",
    totalStudents: "",
    specialization: "",
    workingHours: "",
    govtCertificateNo: "",
    gstNumber: "",
    panNumber: "",
    accreditationDetails: "",
    password: "",
    confirmPassword: "",
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.declaration) {
      alert("Please accept the declaration");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      
      const payload = { ...formData };
      delete payload.declaration;

      await axios.post("https://decentraid-4-4y2v.onrender.com/api/institution/register", payload);

      alert("Registration successful!");
      navigate("verifier-Portal/VerifierLogin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="reg-container">
      <h2>Institution Registration</h2>
      <form className="reg-form" onSubmit={handleSubmit}>

        
        <section>
          <h3>Basic Organization Details</h3>
          <input
            name="officialName"
            placeholder="Official Name"
            onChange={handleChange}
            required
          />
          <select name="organizationType" onChange={handleChange} required>
            <option value="">Select Type</option>
            <option>School</option>
            <option>College</option>
            <option>University</option>
            <option>Company</option>
            <option>NGO</option>
            <option>Startup</option>
            <option>Freelancing Agency</option>
            <option>Partnership Firm</option>
            <option>Other</option>
          </select>
          <input
            name="yearOfEstablishment"
            placeholder="Year of Establishment"
            onChange={handleChange}
          />
          <input
            name="registrationNumber"
            placeholder="Registration Number"
            onChange={handleChange}
          />
          <input
            name="affiliatedBody"
            placeholder="Affiliated Board / University / Governing Body"
            onChange={handleChange}
          />
        </section>

        
        <section>
          <h3>Contact Information</h3>
          <input
            name="officialEmail"
            placeholder="Official Email"
            onChange={handleChange}
          />
          <input
            name="officialContact"
            placeholder="Official Contact Number"
            onChange={handleChange}
          />
          <input
            name="website"
            placeholder="Website"
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Registered Office Address"
            onChange={handleChange}
          />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />
          <input
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
          />
        </section>

        
        <section>
          <h3>Authorized Representative</h3>
          <input
            name="authorizedPersonName"
            placeholder="Authorized Person Name"
            onChange={handleChange}
          />
          <select name="designation" onChange={handleChange}>
            <option value="">Designation</option>
            <option>Principal</option>
            <option>Director</option>
            <option>CEO</option>
            <option>Manager</option>
            <option>Partner</option>
          </select>
          <input
            name="authorizedEmail"
            placeholder="Official Email"
            onChange={handleChange}
          />
          <input
            name="authorizedContact"
            placeholder="Contact Number"
            onChange={handleChange}
          />
        </section>

      
        <section>
          <h3>Operational Information</h3>
          <input
            name="natureOfServices"
            placeholder="Nature of Services / Activities"
            onChange={handleChange}
          />
          <input
            name="totalStaff"
            placeholder="Total Staff"
            onChange={handleChange}
          />
          <input
            name="totalStudents"
            placeholder="Total Students / Employees"
            onChange={handleChange}
          />
          <input
            name="specialization"
            placeholder="Areas of Specialization"
            onChange={handleChange}
          />
          <input
            name="workingHours"
            placeholder="Working Hours"
            onChange={handleChange}
          />
        </section>

       
        <section>
          <h3>Legal & Compliance</h3>
          <input
            name="govtCertificateNo"
            placeholder="Government Certificate Number"
            onChange={handleChange}
          />
          <input
            name="gstNumber"
            placeholder="GST Number"
            onChange={handleChange}
          />
          <input
            name="panNumber"
            placeholder="PAN / Tax ID"
            onChange={handleChange}
          />
          <input
            name="accreditationDetails"
            placeholder="Accreditation / Recognition Details"
            onChange={handleChange}
          />
        </section>

        
        <section>
          <h3>Create Account Password</h3>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </section>

       
        <div className="declaration">
          <label>
            <input
              type="checkbox"
              name="declaration"
              onChange={handleChange}
            />
            I confirm all information provided is accurate and authentic.
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default Register;
