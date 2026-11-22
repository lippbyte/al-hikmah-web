import { createContext, useContext, useState, useEffect } from "react";

const DEMO_ACCOUNTS = {
  guru: {
    id: "guru-1",
    role: "guru",
    name: "Ustadz Rakan Shaka, S.Pd.I",
    email: "rakanshaka3@gmail.com",
    class: "VIII-A",
    title: "Wali Kelas VIII-A & Guru PAI",
    avatar: "R",
    initials: "RS",
  },
  siswa: {
    id: "siswa-1",
    role: "siswa",
    name: "Faris Faizulhaq Alakiyas",
    email: "faris@alhikmah.id",
    class: "VIII-A",
    nis: "202408112",
    title: "Siswa Kelas VIII-A",
    avatar: "F",
    initials: "FA",
  },
  ortu: {
    id: "ortu-1",
    role: "orang-tua",
    name: "Ibu Fauzan (Wali Santri)",
    email: "wali.fauzan@gmail.com",
    class: "VIII-A",
    title: "Wali Santri Ahmad Fauzan (VIII-A)",
    childName: "Ahmad Fauzan",
    avatar: "O",
    initials: "OF",
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-user-session");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEMO_ACCOUNTS.guru; // default
  });

  useEffect(() => {
    try {
      localStorage.setItem("al-hikmah-user-session", JSON.stringify(currentUser));
    } catch {
      // ignore
    }
  }, [currentUser]);

  const loginAs = (roleKey) => {
    let target = DEMO_ACCOUNTS[roleKey];
    if (!target) {
      if (roleKey === "orang-tua") target = DEMO_ACCOUNTS.ortu;
      else target = DEMO_ACCOUNTS.guru;
    }
    setCurrentUser(target);
    return target;
  };

  const switchRole = () => {
    let nextRole = "guru";
    if (currentUser?.role === "guru") nextRole = "siswa";
    else if (currentUser?.role === "siswa") nextRole = "orang-tua";
    else nextRole = "guru";

    const targetKey = nextRole === "orang-tua" ? "ortu" : nextRole;
    setCurrentUser(DEMO_ACCOUNTS[targetKey]);
    return nextRole;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("al-hikmah-user-session");
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
