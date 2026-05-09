"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.statePage} role="alert">
      <p className={styles.stateKicker}>Site recovery</p>
      <h1>Something slipped out of place</h1>
      <p>
        The page hit a rough patch. Try loading it again, or email Nexora if the site keeps
        misbehaving.
      </p>
      <div className={styles.stateActions}>
        <button type="button" onClick={reset}>
          Try again
        </button>
        <a href="mailto:hello@nexoralabs.com">Email Nexora</a>
      </div>
      {error.digest ? <small className={styles.stateNote}>Reference: {error.digest}</small> : null}
    </main>
  );
}
