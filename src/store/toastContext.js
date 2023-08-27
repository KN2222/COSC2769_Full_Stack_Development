import { createContext, useCallback, useContext, useState } from "react";
import { ToastNotification } from "../components/toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [message, setMessage] = useState(null);

  const showToast = useCallback(
    (statusCode, message) => {
      setStatusCode(statusCode);
      setMessage(message);
      setShow(true);
    },
    [setStatusCode, setMessage, setShow]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        statusCode,
        message,
        show,
        setShow,
      }}
    >
      <ToastNotification
        show={show}
        statusCode={statusCode}
        message={message}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};
