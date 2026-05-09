"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function GlobalError({
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
    <html lang="en" dir="ltr">
      <body>
        <main className={styles.statePage} role="alert">
          <p className={styles.stateKicker}>Site recovery</p>
          <h1>The studio table needs a reset</h1>
          <p>
            The site could not finish loading this view. Reload the page, or email Nexora if
            it keeps happening.
          </p>
          <div className={styles.stateActions}>
            <button type="button" onClick={reset}>
              Reload
            </button>
            <a href="mailto:hello@nexoralabs.com">Email Nexora</a>
          </div>
          {error.digest ? <small className={styles.stateNote}>Reference: {error.digest}</small> : null}
        </main>
      </body>
    </html>
  );
}
