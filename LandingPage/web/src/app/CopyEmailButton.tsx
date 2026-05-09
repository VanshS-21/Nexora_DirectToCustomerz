"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const EMAIL_ADDRESS = "hello@nexoralabs.com";
const CLIPBOARD_TIMEOUT_MS = 650;
type CopyStatus = "idle" | "copying" | "copied" | "failed";

async function copyWithFallback() {
  const clipboardWrite =
    typeof navigator !== "undefined" ? navigator.clipboard?.writeText?.(EMAIL_ADDRESS) : undefined;

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

  if (typeof document === "undefined") {
    return false;
  }

  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement("textarea");
  textarea.value = EMAIL_ADDRESS;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
    activeElement?.focus({ preventScroll: true });
  }
}

export function CopyEmailButton() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const pendingCopy = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (pendingCopy.current) {
      return;
    }

    pendingCopy.current = true;

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setStatus("copying");

    try {
      const copied = await copyWithFallback();
      setStatus(copied ? "copied" : "failed");

      resetTimer.current = setTimeout(() => {
        setStatus("idle");
      }, 2200);
    } finally {
      pendingCopy.current = false;
    }
  };

  const label =
    status === "copying"
      ? "Copying email"
      : status === "copied"
        ? "Copied to clipboard"
        : status === "failed"
          ? "Copy failed"
          : "Copy email";

  return (
    <button
      type="button"
      className={styles.copyEmailButton}
      data-reveal
      data-copy-state={status}
      onClick={handleCopy}
      aria-label={label}
      aria-busy={status === "copying"}
      disabled={status === "copying"}
    >
      <span aria-hidden="true">
        {status === "copying"
          ? "Copying"
          : status === "copied"
            ? "Copied"
            : status === "failed"
              ? "Try again"
              : "Copy email"}
      </span>
      <small aria-live="polite">{label}</small>
    </button>
  );
}
