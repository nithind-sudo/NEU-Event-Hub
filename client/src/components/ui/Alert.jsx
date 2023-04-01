import Alert from "react-bootstrap/Alert";

export default function MyAlert({ onClose, message, ...props }) {
  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <p>{message}</p>
    </Alert>
  );
}
