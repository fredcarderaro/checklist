import "./Button.style.css";

export function Button({ children, ...rest }) {
  return (
    <button {...rest} className="button">
      {children}
    </button>
  );
}
