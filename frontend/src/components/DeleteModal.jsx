import { useEffect, useRef } from 'react';

const DeleteModal = ({ name, onConfirm, onCancel }) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h2 id="modal-title">Delete Employee</h2>
        <p>Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
          <button ref={confirmRef} onClick={onConfirm} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
