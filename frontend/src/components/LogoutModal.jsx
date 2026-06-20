const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="logout-title">
    <div className="modal">
      <h2 id="logout-title">Cerrar sesión</h2>
      <p>¿Estás seguro de que deseas cerrar sesión?</p>
      <div className="modal-actions">
        <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        <button onClick={onConfirm} className="btn btn-danger">Cerrar sesión</button>
      </div>
    </div>
  </div>
);

export default LogoutModal;
