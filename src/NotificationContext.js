import React, { createContext, useState } from "react";
const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [isUsing, setUsing] = useState(false);
  const [content, setContent] = useState("");
  const [isUploaded, setIsUploaded] = useState(
    localStorage.getItem("isUploaded") === null ? false : true
  );
  return (
    <NotificationContext.Provider
      value={{
        isUsing,
        setUsing,
        content,
        setContent,
        isUploaded,
        setIsUploaded,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
