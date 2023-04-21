import { Toast } from "react-bootstrap";

export default function MyToast({
  bg,
  show,
  onClose,
  message,
  header,
  delay = 3000,
}) {
  return (
    <Toast
      style={{
        position: "fixed",
        top: 55,
        right: 20,
        color : "white"
      }}
      onClose={onClose}
      show={show}
      delay={delay}
      bg={bg}
      className="d-inline-block m-1"
      autohide
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
