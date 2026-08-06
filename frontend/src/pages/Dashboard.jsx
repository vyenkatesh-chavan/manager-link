import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create Category
  const createCategory = async () => {
    if (!categoryName.trim()) {
      alert("Enter category name");
      return;
    }

    try {
      await api.post("/category", {
        categoryName,
      });

      setCategoryName("");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create category");
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    const ok = window.confirm("Delete this category?");

    if (!ok) return;

    try {
      await api.delete(`/category/${id}`);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Password Manager</h1>

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          marginBottom: "25px",
        }}
      >
        Logout
      </button>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
          }}
        />

        <button onClick={createCategory}>
          Add Category
        </button>
      </div>

      <hr />

      <h2>Your Categories</h2>

      {categories.length === 0 ? (
        <p>No Categories Found</p>
      ) : (
        categories.map((category) => (
          <div
            key={category._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{category.categoryName}</h3>

            <p>
              Total Links : {category.links.length}
            </p>

            <button
              onClick={() =>
                navigate(`/category/${category._id}`)
              }
            >
              Open
            </button>

            <button
              style={{
                marginLeft: "10px",
              }}
              onClick={() =>
                deleteCategory(category._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;