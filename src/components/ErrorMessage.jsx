export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <h3>Something went wrong</h3>
      <p>{message || "Unable to load data. Please try again."}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
