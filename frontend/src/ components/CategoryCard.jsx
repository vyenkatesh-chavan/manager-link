import { useNavigate } from "react-router-dom";

function CategoryCard({ category, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="categorycard-card">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        .categorycard-card {
          --bg-card: #16202c;
          --bg-sunken: #101820;
          --border: #253141;
          --accent: #2dd4bf;
          --text: #e7edf3;
          --muted: #8b98a6;
          --danger: #f0576b;
          --danger-bg: rgba(240, 87, 107, 0.12);

          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 18px;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03) inset,
            0 16px 32px -24px rgba(0, 0, 0, 0.6);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
          transition: border-color 0.15s ease;
        }

        .categorycard-card:hover {
          border-color: #33465a;
        }

        .categorycard-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .categorycard-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(45, 212, 191, 0.12);
          color: var(--accent);
        }

        .categorycard-title {
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .categorycard-count {
          margin: 2px 0 0;
          font-size: 13px;
          color: var(--muted);
        }

        .categorycard-count strong {
          color: var(--text);
          font-weight: 600;
        }

        .categorycard-divider {
          height: 1px;
          background: var(--border);
          margin: 16px 0;
        }

        .categorycard-actions {
          display: flex;
          gap: 10px;
        }

        .categorycard-open-btn,
        .categorycard-delete-btn {
          flex: 1;
          border: none;
          border-radius: 8px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease,
            color 0.15s ease, transform 0.05s ease;
        }

        .categorycard-open-btn {
          background: var(--accent);
          color: #06231f;
        }

        .categorycard-open-btn:hover {
          background: #4fe0cd;
        }

        .categorycard-delete-btn {
          background: var(--danger-bg);
          color: var(--danger);
        }

        .categorycard-delete-btn:hover {
          background: rgba(240, 87, 107, 0.2);
        }

        .categorycard-open-btn:active,
        .categorycard-delete-btn:active {
          transform: translateY(1px);
        }
      `}</style>

      <div className="categorycard-header">
        <span className="categorycard-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
          </svg>
        </span>
        <div>
          <h2 className="categorycard-title">{category.categoryName}</h2>
          <p className="categorycard-count">
            <strong>{category.links.length}</strong> saved{" "}
            {category.links.length === 1 ? "link" : "links"}
          </p>
        </div>
      </div>

      <div className="categorycard-divider" />

      <div className="categorycard-actions">
        <button
          className="categorycard-open-btn"
          onClick={() => navigate(`/category/${category._id}`)}
        >
          Open
        </button>

        <button
          className="categorycard-delete-btn"
          onClick={() => onDelete(category._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;