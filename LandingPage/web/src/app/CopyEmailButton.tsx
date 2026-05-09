"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const EMAIL_ADDRESS = "hello@nexoralabs.com";
const CLIPBOARD_TIMEOUT_MS = 650;

async function copyWithFallback() {
  const clipboardWrite = navigator.clipboard?.writeText?.(EMAIL_ADDRESS);

  if (clipboardWrite) {
    const clipboardSucceeded = await Promise.race([
      clipboardWrite.then(() => true).catch(() => false),
      new Promise<false>((resolve) => {
        window.setTimeout(() => resolve(false), CLIPBOARD_TIMEOUT_MS);
      }),
    ]);

    if (clipboardSucceeded) {
      return true;
    }
  }

  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement("textarea");
  textarea.value = EMAIL_ADDRESS;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
    activeElement?.focus({ preventScroll: true });
  }
}

export function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    const copied = await copyWithFallback();
    setStatus(copied ? "copied" : "failed");

    resetTimer.current = setTimeout(() => {
      setStatus("idle");
    }, 2200);
  };

  const label =
    status === "copied" ? "Copied to clipboard" : status === "failed" ? "Copy failed" : "Copy email";

  return (
    <button
      type="button"
      className={styles.copyEmailButton}
      data-reveal
      data-copy-state={status}
      onClick={handleCopy}
      aria-label={label}
    >
      <span aria-hidden="true">{status === "copied" ? "Copied" : status === "failed" ? "Try again" : "Copy email"}</span>
      <small aria-live="polite">{label}</small>
    </button>
  );
}
