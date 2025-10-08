export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="loading-indicator" role="status" aria-live="polite">
      <span className="spinner-circle" aria-hidden />
      <span className="spinner-label">{label}</span>
    </div>
  );
}
