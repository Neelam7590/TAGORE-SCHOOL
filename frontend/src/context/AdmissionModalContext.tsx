import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocation } from "wouter";

type AdmissionModalContextType = {
  openModal: () => void;
  admissionSubmitted: boolean;
  setAdmissionSubmitted: (v: boolean) => void;
};

const AdmissionModalContext = createContext<AdmissionModalContextType>({
  openModal: () => {},
  admissionSubmitted: false,
  setAdmissionSubmitted: () => {},
});

export function useAdmissionModal() {
  return useContext(AdmissionModalContext);
}

export function AdmissionModalProvider({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const [admissionSubmitted, setAdmissionSubmitted] = useState(false);

  function openModal() {
    navigate("/admissions");
    setTimeout(() => {
      const form = document.getElementById("admission-form-section");
      if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <AdmissionModalContext.Provider value={{ openModal, admissionSubmitted, setAdmissionSubmitted }}>
      {children}
    </AdmissionModalContext.Provider>
  );
}
