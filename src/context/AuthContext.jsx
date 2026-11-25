import { useState, useEffect } from "react";
import { DEMO_ACCOUNTS } from "../data/demoData";
import { AuthContext } from "./authStore";

function sanitizeStoredUser(raw) {
  if (!raw || typeof raw !== "object") return DEMO_ACCOUNTS.siswa;
  if (raw.role === "guru") return DEMO_ACCOUNTS.guru;
  if (raw.role === "orang-tua") return DEMO_ACCOUNTS.ortu;
  return DEMO_ACCOUNTS.siswa;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-user-session");
      if (saved) return sanitizeStoredUser(JSON.parse(saved));
    } catch {
      // ignore storage errors
    }
    return DEMO_ACCOUNTS.siswa;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(
          "al-hikmah-user-session",
          JSON.stringify(currentUser)
        );
      } else {
        localStorage.removeItem("al-hikmah-user-session");
      }
    } catch {
      // ignore storage errors
    }
  }, [currentUser]);

  const loginAs = (roleKey) => {
    let target = DEMO_ACCOUNTS[roleKey];
    if (!target) {
      if (roleKey === "orang-tua") target = DEMO_ACCOUNTS.ortu;
      else if (roleKey === "guru") target = DEMO_ACCOUNTS.guru;
      else target = DEMO_ACCOUNTS.siswa;
    }
    setCurrentUser(target);
    return target;
  };

  const switchRole = () => {
    let nextRole;
    if (currentUser?.role === "siswa") nextRole = "guru";
    else if (currentUser?.role === "guru") nextRole = "orang-tua";
    else nextRole = "siswa";

    const targetKey = nextRole === "orang-tua" ? "ortu" : nextRole;
    setCurrentUser(DEMO_ACCOUNTS[targetKey]);
    return nextRole;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("al-hikmah-user-session");
    } catch {
      // ignore storage errors
    }
  };

  const isTeacher = currentUser?.role === "guru";
  const isStudent = currentUser?.role === "siswa";
  const isParent = currentUser?.role === "orang-tua";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginAs,
        switchRole,
        logout,
        isTeacher,
        isStudent,
        isParent,
        DEMO_ACCOUNTS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
