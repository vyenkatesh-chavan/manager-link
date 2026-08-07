import { useState } from "react";
import api from "../services/api";

function AddLink({ categoryId, refresh }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    username: "",
    password: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.url ||
      !form.username ||
      !form.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/category/${categoryId}/link`, form);

      alert("Link Added Successfully");

      setForm({
        title: "",
        url: "",
        username: "",
        password: "",
        notes: "",
      });

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <h2>Add New Link</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Website Name"
          value={form.title}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          name="url"
          placeholder="Website URL"
          value={form.url}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          name="username"
          placeholder="Username / Email"
          value={form.username}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          rows="4"
          value={form.notes}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
          }}
        >
          {loading ? "Saving..." : "Save Link"}
        </button>
      </form>
    </div>
  );
}

export default AddLink;
