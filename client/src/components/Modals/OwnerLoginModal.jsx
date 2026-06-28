import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Modal.css";

const OwnerLoginModal = ({ onClose }) => {
  const { login } = useAuth();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!secret.trim()) {
      setError("Please enter the access key");
      return;
    }
    login(secret.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Owner Access</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Access Key</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter owner secret key"
            autoFocus
          />
          {error && <p className="modal-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Unlock
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OwnerLoginModal;
