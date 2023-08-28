import { useEffect, useState } from "react";
import { CheckLg, XCircle } from "react-bootstrap-icons";
import Toast from "react-bootstrap/Toast";
import { useToastContext } from "../../store/toastContext";
import { ToastContainer } from "react-bootstrap";

export const ToastNotification = ({ show, statusCode, message }) => {
  const { setShow } = useToastContext();

  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (statusCode === 200) {
      setIsSuccess(true);
    }
  }, [statusCode]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  }, [show, setShow]);

  return (
    <ToastContainer
      className="p-3"
      position="bottom-end"
      style={{
        zIndex: 9999,
      }}
    >
      <Toast onClose={() => setShow(false)} show={show}>
        <Toast.Header>
          {isSuccess ? (
            <CheckLg className="rounded me-2" />
          ) : (
            <XCircle className="rounded me-2" />
          )}
          <strong className="me-auto">{isSuccess ? "Success" : "Error"}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
