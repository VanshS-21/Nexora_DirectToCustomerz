"use client";

import { FormEvent, useRef, useState } from "react";
import styles from "@/styles/contact.module.css";

const SERVICE_OPTIONS = [
  { value: "", label: "Choose a service" },
  { value: "new-website", label: "New website" },
  { value: "redesign", label: "Website redesign" },
  { value: "launch-support", label: "Launch support" },
  { value: "other", label: "Other" },
] as const;

type FormState = "idle" | "submitting" | "fading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name";
  if (!data.email.trim()) {
    errors.email = "Please enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email";
  }
  if (!data.service) errors.service = "Please select a service";
  if (!data.message.trim()) errors.message = "Please describe your project";
  return errors;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const honeypotRef = useRef<HTMLInputElement>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    const singleError = validate({ ...formData, [name]: formData[name as keyof FormData] });
    if (singleError[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: singleError[name as keyof FieldErrors],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = formRef.current?.querySelector(
        `[name="${Object.keys(errors)[0]}"]`,
      ) as HTMLElement | null;
      firstErrorField?.focus();
      return;
    }

    setFormState("submitting");
    setFieldErrors({});

    // Honeypot: if filled, silently reject
    if (honeypotRef.current?.value) {
      setFormState("success");
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12_000);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Submission failed");

      setFormState("fading");
      setTimeout(() => {
        setFormState("success");
        setTimeout(() => successRef.current?.focus(), 60);
      }, 280);
    } catch {
      setFormState("error");
      errorRef.current?.focus();
    }
  };

  if (formState === "success") {
    return (
      <div ref={successRef} className={styles.contactFormSuccess} role="status" aria-live="polite" tabIndex={-1}>
        <div className={styles.contactFormSuccessIcon} aria-hidden="true" />
        <h3 className={styles.contactFormSuccessTitle}>Got it.</h3>
        <p className={styles.contactFormSuccessCopy}>
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className={`${styles.contactForm}${formState === "fading" ? ` ${styles.contactFormFading}` : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {formState === "error" && (
        <p className={styles.contactFormError} role="alert" tabIndex={-1} ref={errorRef}>
          Something went wrong. Please try again.
        </p>
      )}

      {/* Honeypot: hidden from humans, visible to bots */}
      <div className={styles.contactFormHoneypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          ref={honeypotRef}
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className={styles.contactFormField}>
        <label htmlFor="contact-name" className={styles.contactFormLabel}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          className={styles.contactFormInput}
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          disabled={formState === "submitting"}
        />
        {fieldErrors.name && (
          <span id="contact-name-error" className={styles.contactFormFieldError} role="alert">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className={styles.contactFormField}>
        <label htmlFor="contact-email" className={styles.contactFormLabel}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          className={styles.contactFormInput}
          placeholder="you@business.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          disabled={formState === "submitting"}
        />
        {fieldErrors.email && (
          <span id="contact-email-error" className={styles.contactFormFieldError} role="alert">
            {fieldErrors.email}
          </span>
        )}
      </div>

      <div className={styles.contactFormField}>
        <label htmlFor="contact-service" className={styles.contactFormLabel}>
          Service
        </label>
        <div className={styles.contactFormSelectWrap}>
          <select
            id="contact-service"
            name="service"
            className={styles.contactFormSelect}
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!fieldErrors.service}
            aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}
            disabled={formState === "submitting"}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {fieldErrors.service && (
          <span id="contact-service-error" className={styles.contactFormFieldError} role="alert">
            {fieldErrors.service}
          </span>
        )}
      </div>

      <div className={styles.contactFormField}>
        <label htmlFor="contact-message" className={styles.contactFormLabel}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          maxLength={2000}
          className={styles.contactFormTextarea}
          placeholder="What's your business about?"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          disabled={formState === "submitting"}
        />
        {fieldErrors.message && (
          <span id="contact-message-error" className={styles.contactFormFieldError} role="alert">
            {fieldErrors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.contactFormSubmit}
        disabled={formState === "submitting"}
      >
        {formState === "submitting" ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}
