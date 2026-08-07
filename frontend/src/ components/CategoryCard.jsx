import { useNavigate } from "react-router-dom";

function CategoryCard({ category, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2>{category.categoryName}</h2>

      <p>
        <strong>Total Links:</strong> {category.links.length}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => navigate(`/category/${category._id}`)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Open
        </button>

        <button
          onClick={() => onDelete(category._id)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
