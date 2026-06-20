import { useEffect, useRef } from 'react';

const DeleteModal = ({ name, onConfirm, onCancel }) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h2 id="modal-title">Eliminar empleado</h2>
        <p>¿Estás seguro de que deseas eliminar a <strong>{name}</strong>? Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          <button ref={confirmRef} onClick={onConfirm} className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
