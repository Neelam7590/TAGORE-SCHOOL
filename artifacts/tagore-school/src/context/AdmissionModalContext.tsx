import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "wouter";

type AdmissionModalContextType = {
  openModal: () => void;
};

const AdmissionModalContext = createContext<AdmissionModalContextType>({
  openModal: () => {},
});

export function useAdmissionModal() {
  return useContext(AdmissionModalContext);
}

export function AdmissionModalProvider({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();

  function openModal() {
    navigate("/admissions");
    setTimeout(() => {
      const form = document.getElementById("admission-form-section");
      if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <AdmissionModalContext.Provider value={{ openModal }}>
      {children}
    </AdmissionModalContext.Provider>
  );
}
