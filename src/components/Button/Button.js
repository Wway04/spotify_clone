import "./Button.scss";
function Button({ children, type = "primary", className, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      <button className={`btn-spotify ${type} ${className}`}>
        <span className="content">{children}</span>
      </button>
    </div>
  );
}

export default Button;
