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

  const [showPassword, setShowPassword] = useState(false);
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
    <div className="addlink-card">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        .addlink-card {
          --bg-card: #16202c;
          --border: #253141;
          --border-focus: #2dd4bf;
          --accent: #2dd4bf;
          --accent-dim: #1b7f73;
          --text: #e7edf3;
          --muted: #8b98a6;

          width: 100%;
          max-width: 560px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
          margin-bottom: 30px;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03) inset,
            0 20px 40px -24px rgba(0, 0, 0, 0.6);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .addlink-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .addlink-badge {
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

        .addlink-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .addlink-subtitle {
          margin: 2px 0 0;
          font-size: 13px;
          color: var(--muted);
        }

        .addlink-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .addlink-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .addlink-row {
            grid-template-columns: 1fr;
          }
        }

        .addlink-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .addlink-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .addlink-input,
        .addlink-textarea {
          width: 100%;
          box-sizing: border-box;
          background: #101820;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          color: var(--text);
          font-family: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .addlink-input::placeholder,
        .addlink-textarea::placeholder {
          color: #55636f;
        }

        .addlink-input:focus,
        .addlink-textarea:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.15);
        }

        .addlink-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .addlink-password-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .addlink-password-input {
          padding-right: 60px;
          letter-spacing: 0.08em;
        }

        .addlink-toggle-visibility {
          position: absolute;
          right: 6px;
          border: none;
          background: transparent;
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 8px;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
        }

        .addlink-toggle-visibility:hover {
          background: rgba(45, 212, 191, 0.1);
        }

        .addlink-submit {
          margin-top: 4px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background: var(--accent);
          color: #06231f;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .addlink-submit:hover:not(:disabled) {
          background: #4fe0cd;
        }

        .addlink-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .addlink-submit:disabled {
          background: var(--accent-dim);
          color: #0b3a34;
          cursor: not-allowed;
        }

        .addlink-loading-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .addlink-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(6, 35, 31, 0.35);
          border-top-color: #06231f;
          border-radius: 50%;
          animation: addlink-spin 0.7s linear infinite;
        }

        @keyframes addlink-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="addlink-header">
        <span className="addlink-badge" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <div>
          <h2 className="addlink-title">Add New Link</h2>
          <p className="addlink-subtitle">Save credentials to this vault</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="addlink-form">
        <div className="addlink-field">
          <label className="addlink-label" htmlFor="title">
            Website name
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g. GitHub"
            value={form.title}
            onChange={handleChange}
            className="addlink-input"
          />
        </div>

        <div className="addlink-field">
          <label className="addlink-label" htmlFor="url">
            Website URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            placeholder="https://example.com"
            value={form.url}
            onChange={handleChange}
            className="addlink-input"
          />
        </div>

        <div className="addlink-row">
          <div className="addlink-field">
            <label className="addlink-label" htmlFor="username">
              Username / Email
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="you@example.com"
              value={form.username}
              onChange={handleChange}
              className="addlink-input"
            />
          </div>

          <div className="addlink-field">
            <label className="addlink-label" htmlFor="password">
              Password
            </label>
            <div className="addlink-password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="addlink-input addlink-password-input"
              />
              <button
                type="button"
                className="addlink-toggle-visibility"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        <div className="addlink-field">
          <label className="addlink-label" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Optional notes, recovery codes, etc."
            rows="4"
            value={form.notes}
            onChange={handleChange}
            className="addlink-textarea"
          />
        </div>

        <button type="submit" disabled={loading} className="addlink-submit">
          {loading ? (
            <span className="addlink-loading-row">
              <span className="addlink-spinner" />
              Saving...
            </span>
          ) : (
            "Save link"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddLink;