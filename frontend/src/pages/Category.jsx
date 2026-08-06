import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  const [form, setForm] = useState({
    title: "",
    url: "",
    username: "",
    password: "",
    notes: "",
  });

  const [showPassword, setShowPassword] = useState({});

  const getCategory = async () => {
    try {
      const res = await api.get(`/category/${id}`);
      setCategory(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to load category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addLink = async () => {
    if (
      !form.title ||
      !form.url ||
      !form.username ||
      !form.password
    ) {
      alert("Please fill required fields");
      return;
    }

    try {
      await api.post(`/category/${id}/link`, form);

      setForm({
        title: "",
        url: "",
        username: "",
        password: "",
        notes: "",
      });

      getCategory();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const deleteLink = async (linkId) => {
    if (!window.confirm("Delete this link?")) return;

    try {
      await api.delete(`/category/${id}/link/${linkId}`);
      getCategory();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  if (!category) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <h1>{category.categoryName}</h1>

      <hr />

      <h2>Add New Link</h2>

      <input
        name="title"
        placeholder="Website Name"
        value={form.title}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="url"
        placeholder="Website URL"
        value={form.url}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={addLink}>
        Save Link
      </button>

      <hr />

      <h2>Saved Links</h2>

      {category.links.length === 0 ? (
        <h3>No Links Found</h3>
      ) : (
        category.links.map((link) => (
          <div
            key={link._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>{link.title}</h3>

            <p>
              <b>URL : </b>

              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.url}
              </a>
            </p>

            <p>
              <b>Username : </b>
              {link.username}

              <button
                onClick={() =>
                  copyText(link.username)
                }
                style={{ marginLeft: "10px" }}
              >
                Copy
              </button>
            </p>

            <p>
              <b>Password : </b>

              {showPassword[link._id]
                ? link.password
                : "********"}

              <button
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    [link._id]:
                      !showPassword[link._id],
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                {showPassword[link._id]
                  ? "Hide"
                  : "Show"}
              </button>

              <button
                onClick={() =>
                  copyText(link.password)
                }
                style={{ marginLeft: "10px" }}
              >
                Copy
              </button>
            </p>

            <p>
              <b>Notes :</b>

              <br />

              {link.notes}
            </p>

            <button
              onClick={() =>
                deleteLink(link._id)
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

export default Category;