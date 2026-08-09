"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Порожня підписка для useSyncExternalStore
const emptySubscribe = () => () => {};

// Хук для безпечної перевірки, чи ми на клієнті
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Значення на клієнті
    () => false, // Значення на сервері (SSR)
  );
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Якщо ми ще на сервері АБО модалка закрита — нічого не рендеримо
  if (!isClient || !isOpen) {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
