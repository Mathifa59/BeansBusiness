import { useSyncExternalStore } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/constants/company";

export type ConsentChoice = "granted" | "denied";
/** "pending" = aún no sabemos (render de servidor); "unset" = el visitante no ha decidido */
type ConsentState = ConsentChoice | "unset" | "pending";

const STORAGE_KEY = "bb-cookie-consent";
const CHANGE_EVENT = "bb-cookie-consent-change";

// Respaldo para navegadores que bloquean localStorage (p. ej. modo privado).
let memoryChoice: ConsentChoice | null = null;

function readStored(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return memoryChoice;
  }
}

function persist(choice: ConsentChoice | null) {
  memoryChoice = choice;
  try {
    if (choice) window.localStorage.setItem(STORAGE_KEY, choice);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sin almacenamiento: queda solo el respaldo en memoria
  }
}

function setAnalyticsDisabled(disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

/** Detiene el envío de datos y borra las cookies _ga* (en el dominio y sus padres). */
function disableAnalytics() {
  setAnalyticsDisabled(true);

  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  if (names.length === 0) return;

  const labels = window.location.hostname.split(".");
  const domains: Array<string | undefined> = [undefined];
  for (let i = 0; i < labels.length - 1; i++) domains.push(labels.slice(i).join("."));

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore<ConsentState>(
    subscribe,
    () => readStored() ?? "unset",
    () => "pending"
  );
}

export function setConsent(choice: ConsentChoice) {
  persist(choice);
  if (choice === "denied") disableAnalytics();
  else setAnalyticsDisabled(false);
  notify();
}

/** Retira la decisión (y el consentimiento, si lo había) para que el aviso vuelva a aparecer. */
export function resetConsent() {
  persist(null);
  disableAnalytics();
  notify();
}
