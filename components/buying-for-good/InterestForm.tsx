"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Audience = "business" | "charity" | "supporter";

type FormValues = {
  audience: Audience;
  name: string;
  email: string;
  organisation: string;
  website: string;
  message: string;
  updates: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  audience: "business",
  name: "",
  email: "",
  organisation: "",
  website: "",
  message: "",
  updates: false,
};

const audienceLabels: Record<Audience, string> = {
  business: "Business",
  charity: "Charity",
  supporter: "Supporter",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please tell us briefly what you are interested in.";
  return errors;
}

export function InterestForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const firstError = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submitted && attempted && Object.keys(errors).length) firstError.current?.focus();
  }, [attempted, errors, submitted]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setAttempted(true);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  if (submitted) {
    return (
      <div className="conversion-confirmation" role="status" aria-live="polite">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">Your enquiry is ready for the next step.</h3>
        <p className="mt-6 max-w-xl text-base leading-8 text-ocean-950/64">
          This demo has recorded the form interaction locally in the browser. No email or backend service is connected, so no enquiry has been delivered.
        </p>
        <button type="button" onClick={() => { setSubmitted(false); setAttempted(false); setErrors({}); }} className="mt-8 border-b border-ocean-950/25 pb-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4">
          Edit your enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={submit} noValidate aria-describedby="form-boundary-note" className="space-y-10">
      {attempted && errorCount > 0 && (
        <div ref={firstError} tabIndex={-1} role="alert" className="rounded-2xl border border-red-900/20 bg-red-50 p-5 text-sm leading-6 text-red-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800">
          Please check the highlighted fields below.
        </div>
      )}

      <fieldset>
        <legend className="font-display text-2xl leading-tight sm:text-3xl">I am here as a...</legend>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {(Object.keys(audienceLabels) as Audience[]).map((key) => {
            const selected = values.audience === key;
            return (
              <label key={key} className={`relative cursor-pointer rounded-2xl border px-5 py-5 text-sm transition-colors focus-within:ring-2 focus-within:ring-ocean-700 focus-within:ring-offset-2 ${selected ? "border-ocean-950 bg-ocean-950 text-sand" : "border-ocean-950/14 hover:border-ocean-950/30"}`}>
                <input className="sr-only" type="radio" name="audience" value={key} checked={selected} onChange={() => update("audience", key)} />
                <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.22em] opacity-55">0{Object.keys(audienceLabels).indexOf(key) + 1}</span>
                <span className="mt-2 block font-display text-2xl">{audienceLabels[key]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="interest-name" label="Name" value={values.name} error={errors.name} required onChange={(value) => update("name", value)} />
        <Field id="interest-email" label="Email" type="email" value={values.email} error={errors.email} required onChange={(value) => update("email", value)} />
      </div>

      {values.audience !== "supporter" && (
        <div className="grid gap-8 sm:grid-cols-2">
          <Field id="interest-organisation" label={values.audience === "charity" ? "Charity / organisation" : "Business / organisation"} value={values.organisation} onChange={(value) => update("organisation", value)} />
          <Field id="interest-website" label="Website (optional)" type="url" value={values.website} optional onChange={(value) => update("website", value)} />
        </div>
      )}

      <div>
        <label htmlFor="interest-message" className="block font-display text-2xl leading-tight sm:text-3xl">What would you like to explore?</label>
        <textarea
          id="interest-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "interest-message-error" : undefined}
          className={`mt-4 w-full resize-y rounded-2xl border bg-transparent px-5 py-4 text-base leading-7 outline-none placeholder:text-ocean-950/35 focus:ring-2 focus:ring-ocean-700 ${errors.message ? "border-red-800" : "border-ocean-950/16"}`}
          placeholder="A short note is enough."
        />
        {errors.message && <p id="interest-message-error" className="mt-2 text-sm text-red-900">{errors.message}</p>}
      </div>

      <div className="rounded-2xl border border-ocean-950/10 p-5">
        <label className="flex gap-3 text-sm leading-6">
          <input type="checkbox" checked={values.updates} onChange={(event) => update("updates", event.target.checked)} className="mt-1 h-4 w-4 accent-ocean-900 focus:ring-2 focus:ring-ocean-700" />
          <span>I would like to receive updates about Buying for Good. <span className="text-ocean-950/50">Optional.</span></span>
        </label>
        <p className="mt-3 pl-7 text-xs leading-5 text-ocean-950/50">This optional update preference is separate from sending your enquiry.</p>
      </div>

      <div id="form-boundary-note" className="rounded-2xl bg-ocean-950/[0.04] p-5 text-xs leading-6 text-ocean-950/55">
        <strong className="font-semibold text-ocean-950/75">Demo integration boundary:</strong> this prototype has no submission API, email service, CRM connection, or database configured. The confirmation state below is therefore a local UI simulation only.
      </div>

      <button type="submit" disabled={submitting} className="inline-flex min-h-12 items-center justify-center rounded-full bg-ocean-950 px-7 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sand disabled:cursor-wait disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4">
        {submitting ? "Preparing…" : "Submit expression of interest"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  type = "text",
  required = false,
  optional = false,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block font-display text-2xl leading-tight sm:text-3xl">
        {label} <span className="font-sans text-xs text-ocean-950/45">{required ? "Required" : optional ? "Optional" : ""}</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-4 min-h-12 w-full rounded-2xl border bg-transparent px-5 text-base outline-none placeholder:text-ocean-950/35 focus:ring-2 focus:ring-ocean-700 ${error ? "border-red-800" : "border-ocean-950/16"}`}
      />
      {error && <p id={errorId} className="mt-2 text-sm text-red-900">{error}</p>}
    </div>
  );
}
