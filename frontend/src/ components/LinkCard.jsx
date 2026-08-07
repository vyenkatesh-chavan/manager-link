import { useState } from "react";

function LinkCard({ link, categoryId, onDelete, onEdit }) {
  const [showPassword, setShowPassword] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied Successfully");
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{link.title}</h3>

      <hr />

      <p>
        <strong>Website : </strong>

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.url}
        </a>
      </p>

      <p>
        <strong>Username : </strong>

        {link.username}

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => copyText(link.username)}
        >
          Copy
        </button>
      </p>

      <p>
        <strong>Password : </strong>

        {showPassword
          ? link.password
          : "••••••••••"}

        <button
          style={{ marginLeft: "10px" }}
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? "Hide" : "Show"}
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => copyText(link.password)}
        >
          Copy
        </button>
      </p>

      <p>
        <strong>Notes :</strong>

        <br />

        {link.notes || "No Notes"}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() =>
            onEdit(categoryId, link)
          }
        >
          Edit
        </button>

        <button
          style={{
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() =>
            onDelete(categoryId, link._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
