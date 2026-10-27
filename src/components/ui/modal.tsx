"use client";
import { useEffect, useRef } from "react";

export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    el?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { el?.close(); document.body.style.overflow = overflow; trigger?.focus(); };
  }, []);
  return <dialog ref={dialog} className="store-modal" aria-label={title} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-content"><button className="modal-close icon-button" type="button" aria-label="Close" onClick={onClose}>×</button>{children}</div></dialog>;
}
