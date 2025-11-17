import baseURL from "api/autoApi";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

const CreateUser = () => {
  const [userList, setUserList] = useState([]);
  const [activeTab, setActiveTab] = useState("Admin");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    selectUser: "",
  });
  const [errors, setErrors] = useState({});

  const userTypeMap = {
    Admin: "Administrator",
    Agent: "Auto",
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const res = await fetch(`${baseURL}/GetOperationsList`);
      const data = await res.json();
      setUserList(data.operationsUser || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setFormData((prev) => ({
        ...prev,
        role: value,
        selectUser: userTypeMap[value] || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.selectUser) newErrors.selectUser = "User type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/CreateOperationsList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          userType: formData.selectUser,
          type: formData.type || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          selectUser: "",
        });
        fetchUserList();

        // close modal programmatically
        const modalEl = document.getElementById("createUserModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Sr.No",
      selector: (row, i) => i + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "120px",
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "User Type", selector: (row) => row.userType, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Unique ID", selector: (row) => row.uniqueId, sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#edededff",
        // color: "black",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const data = userList.find((group) => group.role === activeTab)?.list || [];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User List</h3>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createUserModal"
        >
          + Create User
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {["Admin", "Agent"].map((role) => (
          <li className="nav-item" key={role}>
            <button
              className={`nav-link ${activeTab === role ? "active" : ""}`}
              onClick={() => setActiveTab(role)}
            >
              {role}
            </button>
          </li>
        ))}
      </ul>

      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        dense
        customStyles={customStyles}
      />

      {/* Modal */}
      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        {/* Centered and large width */}
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="createUserModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Name */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <small className="text-danger">{errors.name}</small>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                </div>

                <div className="row">
                  {/* Password */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>

                  {/* Role */}
                  <div className="col-6 mb-3">
                    <label className="form-label">Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Agent">Agent</option>
                    </select>
                    {errors.role && (
                      <small className="text-danger">{errors.role}</small>
                    )}
                  </div>
                </div>

                {/* User Type */}
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <input
                    name="selectUser"
                    className="form-control"
                    value={formData.selectUser}
                    readOnly
                  />
                  {errors.selectUser && (
                    <small className="text-danger">{errors.selectUser}</small>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CreateUser;
