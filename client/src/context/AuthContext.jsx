import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ownerSecret, setOwnerSecret] = useState(
    () => sessionStorage.getItem("owner-secret") || ""
  );

  const isOwner = Boolean(ownerSecret);

  const login = (secret) => {
    sessionStorage.setItem("owner-secret", secret);
    setOwnerSecret(secret);
  };

  const logout = () => {
    sessionStorage.removeItem("owner-secret");
    setOwnerSecret("");
  };

  return (
    <AuthContext.Provider value={{ isOwner, ownerSecret, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
