import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [phoneError, setPhoneError] = useState(""); // Error state for phone number

  const nichesArray = [
    "Software Engineer/Developer",
    "Web Developer",
    "Cybersecurity",
    "Data Science",
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "Systems Analyst",
    "Network Engineer",
    "Artificial Intelligence Engineer",
    "Cloud Engineer",
    "DevOps Engineer",
    "Mobile App Developer",
    "Blockchain Developer",
    "Database Administrator",
    "Network Engineer",
    "UI/UX Designer",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
    "Financial Analyst",
    "Marketing Assistant",
    "Social Media Coordinator",
    "Market Research Analyst",
    "Mechanical Engineer",
    "Civil Engineer",
    "Electrical Engineer",
    "Chemical Engineer",
    "Business Analyst",
    "Product Manager",
    "Project Manager",
    "Marketing Manager",
    "Financial Analyst",
    "Accountant",
    "Tax Consultant",
    "Quality Assurance (QA) Engineer"
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0]; //to get files
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user //to access userSlice
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate(); //if user is authenticated then redirect it to homepage

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate phone number length before submitting
    if (phone.length > 10) {
      setPhoneError("Phone number should not exceed 10 digits");
      return;
    } else if (phone.length < 10) {
      setPhoneError("Phone number should be 10 digits");
      return;
    } else {
      setPhoneError(""); // Clear error if phone is valid
    }

    // Continue with form submission if validation passes
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="wrapper">
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="111-222-333"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
              {phoneError && <div style={{ color: "red" }}>{phoneError}</div>} {/* Display error message */}
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressBook />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
          </div>
          {role === "Job Seeker" && (
            <>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Your First Niche</label>
                  <div>
                    <select
                      value={firstNiche}
                      onChange={(e) => setFirstNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option key={index} value={niche}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Second Niche</label>
                  <div>
                    <select
                      value={secondNiche}
                      onChange={(e) => setSecondNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option key={index} value={niche}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Third Niche</label>
                  <div>
                    <select
                      value={thirdNiche}
                      onChange={(e) => setThirdNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option key={index} value={niche}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Coverletter</label>
                  <div>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={10}
                    />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input
                      type="file"
                      onChange={resumeHandler}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <button type="submit" disabled={loading}>
            Register
          </button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
