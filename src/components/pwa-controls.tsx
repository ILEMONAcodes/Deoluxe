"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface InstallEvent extends Event { prompt(): Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> }
function subscribeOnline(callback: () => void) { window.addEventListener("online", callback); window.addEventListener("offline", callback); return () => { window.removeEventListener("online", callback); window.removeEventListener("offline", callback); }; }

export function PwaControls() {
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
  const pathname = usePathname();
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [eligible, setEligible] = useState(false);
  const [update, setUpdate] = useState<ServiceWorker | null>(null);
  const requestedUpdate = useRef(false);

  useEffect(() => {
    let views = 1;
    try { views = Number(sessionStorage.getItem("dlx-views") ?? 0) + 1; sessionStorage.setItem("dlx-views", String(views)); } catch { /* Storage may be disabled. */ }
    const timer = window.setTimeout(() => {
      let dismissed = 0;
      try { dismissed = Number(localStorage.getItem("dlx-install-dismissed") ?? 0); } catch { /* Install remains optional. */ }
      setEligible(views >= 2 && Date.now() - dismissed > 14 * 24 * 60 * 60 * 1000);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const capture = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent); };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let active = true;
    const controllerChanged = () => { if (requestedUpdate.current) window.location.reload(); };
    navigator.serviceWorker.addEventListener("controllerchange", controllerChanged);
    void navigator.serviceWorker.register("/sw.js").then(registration => {
      if (!active) return;
      if (registration.waiting) setUpdate(registration.waiting);
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => { if (active && worker.state === "installed" && navigator.serviceWorker.controller) setUpdate(worker); });
      });
    }).catch(() => { /* Browsing remains available if worker registration is blocked. */ });
    return () => { active = false; navigator.serviceWorker.removeEventListener("controllerchange", controllerChanged); };
  }, []);

  function dismissInstall() { try { localStorage.setItem("dlx-install-dismissed", String(Date.now())); } catch { /* No persistence in private sessions. */ } setEligible(false); }

  return <>
    {!online && <div className="offline-banner" role="status">You’re offline — saved pages still work.</div>}
    {update && <aside className="pwa-notice" aria-label="App update"><p>Update available.</p><Button onClick={() => { requestedUpdate.current = true; update.postMessage({ type: "SKIP_WAITING" }); }}>Refresh</Button></aside>}
    {installEvent && eligible && !update && <aside className="pwa-notice" aria-label="Install Deoluxe"><p>Deoluxe, one tap away.</p><Button onClick={async () => { await installEvent.prompt(); await installEvent.userChoice; setInstallEvent(null); }}>Install Deoluxe</Button><Button variant="ghost" onClick={dismissInstall}>Not now</Button></aside>}
  </>;
}
