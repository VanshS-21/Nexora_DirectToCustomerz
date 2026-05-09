import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.statePage}>
      <p className={styles.stateKicker}>404</p>
      <h1>This page is not on the launch map</h1>
      <p>
        The address may have changed, or the page may have been folded back into the main
        Nexora route.
      </p>
      <div className={styles.stateActions}>
        <Link href="/">Back to homepage</Link>
        <Link href="/#contact">Contact Nexora</Link>
      </div>
    </main>
  );
}
