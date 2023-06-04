import React, { createContext, useState } from "react";
const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [isUsing, setUsing] = useState(false);
  const [content, setContent] = useState("");
  return (
    <NotificationContext.Provider
      value={{ isUsing, setUsing, content, setContent }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
