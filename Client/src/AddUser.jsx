import React, { useState, useEffect } from "react";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    address: "",
  });

  const [userData, setUserData] = useState([]); // To store fetched data
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/abc/getAll`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        console.log(json);
        setUserData(json); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/abc/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      const result = await response.json();
      console.log("User registered successfully:", result);
      setFormData({
        name: "",
        email: "",
        password: "",
        dob: "",
        address: "",
      }); // Reset the form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    fetchUserData();
  };

  const handleDelete = async (id) => {
    // console.log(id);
    // return
    
      try {
      const response = await fetch(`http://localhost:7000/abc/deleteOne/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      console.log(`User with ID ${id} deleted successfully`);
      fetchUserData(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    fetchUserData();
  };

  const deletAllUsers= async()=>{
    try{
      const response = await fetch("http://localhost:7000/abc/deleteAll", {
        method: "DELETE",
        });
        if(!response.ok){
          throw new Error("Failed to delete all users");
        }
        console.log("All users deleted successfully");
        fetchUserData();
    } 
    catch(error){
      console.error("Error deleting all users:", error);
    }
  }

  

  return (
    <div className="container">
      <div style={{ maxWidth: "500px", marginTop:"15px", border:"1px solid black", padding:"0 10px"}}>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>
    <div style={{display:"flex"}}>
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              // padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginRight:"15px"
            }}
          >
            Register
          </button>
          <button
            onClick={deletAllUsers}
            style={{
              backgroundColor: "blue",
              color: "white",
              // padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              // margin:"10px 165px"
            }}
          >
            DeleteAll User
          </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Fetched Users:</h3>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"10px 40px"}}>
        {/* <ul> */}
          {userData.map((user, index) => (
            // <li key={index}>
            //   {user.name} - {user.email}
            // </li>
            <div style={{height:"210px", width:"350px", border:"1px solid black", marginBottom:"50px", backgroundColor:"grey"}}>
                
                <p>Name: {user.name}</p> 
                <p>Email: {user.email}</p>
                <p>DOB: {user.dob}</p>
                <p>Address: {user.address}</p>
                <button  onClick={()=>updateUser(user)}style={{marginRight:"50px", marginLeft:"30px",color: "white", backgroundColor: "blue",cursor: "pointer",}}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ color: "white", backgroundColor: "blue"  ,cursor: "pointer",}}>Delete</button>
            </div>
          ))}
          </div>
        {/* </ul> */}
      </div>
    </div>
  );
}

export default AddUser;


