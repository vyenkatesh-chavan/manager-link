import { useState } from "react";

function LinkCard({ link, categoryId, onDelete, onEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyText = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const getFavicon = (url) => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  const favicon = getFavicon(link.url);

  return (
    <div className="linkcard-card">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        .linkcard-card {
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
          transition: border-color 0.15s ease, transform 0.1s ease;
        }

        .linkcard-card:hover {
          border-color: #33465a;
        }

        .linkcard-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .linkcard-identity {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .linkcard-favicon {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          border-radius: 8px;
          background: var(--bg-sunken);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .linkcard-favicon-fallback {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
        }

        .linkcard-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .linkcard-url-link {
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          margin-left: 40px;
          word-break: break-all;
        }

        .linkcard-url-link:hover {
          text-decoration: underline;
        }

        .linkcard-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 16px;
        }

        .linkcard-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .linkcard-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .linkcard-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .linkcard-value-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .linkcard-value {
          font-size: 14px;
          color: var(--text);
          word-break: break-all;
        }

        .linkcard-password {
          letter-spacing: 0.08em;
          font-family: "SF Mono", "Roboto Mono", monospace;
        }

        .linkcard-notes {
          margin: 0;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .linkcard-icon-btn {
          border: 1px solid var(--border);
          background: var(--bg-sunken);
          color: var(--text);
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .linkcard-icon-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .linkcard-actions {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .linkcard-edit-btn,
        .linkcard-delete-btn {
          flex: 1;
          border: none;
          border-radius: 8px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.05s ease;
        }

        .linkcard-edit-btn {
          background: var(--bg-sunken);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .linkcard-edit-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .linkcard-delete-btn {
          background: var(--danger-bg);
          color: var(--danger);
        }

        .linkcard-delete-btn:hover {
          background: rgba(240, 87, 107, 0.2);
        }

        .linkcard-edit-btn:active,
        .linkcard-delete-btn:active {
          transform: translateY(1px);
        }
      `}</style>

      <div className="linkcard-header">
        <div className="linkcard-identity">
          <span className="linkcard-favicon">
            {favicon ? (
              <img src={favicon} alt="" width="18" height="18" />
            ) : (
              <span className="linkcard-favicon-fallback">
                {link.title?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </span>
          <h3 className="linkcard-title">{link.title}</h3>
        </div>

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="linkcard-url-link"
        >
          {link.url}
        </a>
      </div>

      <div className="linkcard-divider" />

      <div className="linkcard-fields">
        <div className="linkcard-field">
          <span className="linkcard-label">Username</span>
          <div className="linkcard-value-row">
            <span className="linkcard-value">{link.username}</span>
            <button
              className="linkcard-icon-btn"
              onClick={() => copyText(link.username, "username")}
            >
              {copiedField === "username" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="linkcard-field">
          <span className="linkcard-label">Password</span>
          <div className="linkcard-value-row">
            <span className="linkcard-value linkcard-password">
              {showPassword ? link.password : "••••••••••"}
            </span>
            <button
              className="linkcard-icon-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <button
              className="linkcard-icon-btn"
              onClick={() => copyText(link.password, "password")}
            >
              {copiedField === "password" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="linkcard-field">
          <span className="linkcard-label">Notes</span>
          <p className="linkcard-notes">{link.notes || "No notes"}</p>
        </div>
      </div>

      <div className="linkcard-actions">
        <button
          className="linkcard-edit-btn"
          onClick={() => onEdit(categoryId, link)}
        >
          Edit
        </button>

        <button
          className="linkcard-delete-btn"
          onClick={() => onDelete(categoryId, link._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;