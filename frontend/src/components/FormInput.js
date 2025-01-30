const FormInput = ({ label, type, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default FormInput;
