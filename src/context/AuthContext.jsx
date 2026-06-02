import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.csrfToken) {
        setEmail(data.name || data.email || "");
        setToken(data.csrfToken);

        return { success: true };
      }

      return {
        success: false,
        error: data?.message || "Login failed",
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  };
  const logout = async () => {
    try {
      const response = await fetch("/api/users/logoff", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRF-TOKEN": token,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return {
          success: false,
          error: data?.message || "Logout failed",
        };
      }

      setEmail("");
      setToken("");

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    email,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
