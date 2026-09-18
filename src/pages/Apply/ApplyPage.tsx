import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import {
  submitWebsiteApplication,
  type WebsiteApplicationPayload,
  type ApiError,
} from '../../services/api';
import './ApplyPage.css';

// ── Animation variants ─────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT, delay },
  }),
};

// ── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  organization: string;
  designation: string; // UI-only; merged into organization on submit
  linkedin: string;
  instagram: string;
  applicationMessage: string;
  confirmed: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  profession?: string;
  confirmed?: string;
}

const EMPTY_FORM: FormState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  profession: '',
  organization: '',
  designation: '',
  linkedin: '',
  instagram: '',
  applicationMessage: '',
  confirmed: false,
};

// ── Validation ─────────────────────────────────────────────────────────────

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.phone.trim()) errors.phone = 'WhatsApp number is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!form.profession.trim()) errors.profession = 'Profession / Occupation is required.';
  if (!form.confirmed) errors.confirmed = 'Please confirm your consent to continue.';

  return errors;
}

// ── Component ──────────────────────────────────────────────────────────────

export const ApplyPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (apiError) setApiError(null);
    };

  const blur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const partialErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: partialErrors[field as keyof FormErrors] }));
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, city: true, profession: true, confirmed: true });

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setApiError(null);

    // Build backend-safe payload — designation appended to organization if provided
    const orgValue = [form.organization, form.designation]
      .filter(Boolean)
      .join(' — ');

    const payload: WebsiteApplicationPayload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      profession: form.profession.trim(),
      organization: orgValue.trim(),
      linkedin: form.linkedin.trim(),
      instagram: form.instagram.trim(),
      applicationMessage: form.applicationMessage.trim(),
      confirmed: true,
      source: 'WEBSITE',
    };

    try {
      await submitWebsiteApplication(payload);
      setSubmitted(true);
    } catch (err) {
      setApiError(err as ApiError);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="apply-page">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          className="apply-header"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="apply-eyebrow">
            <span className="apply-eyebrow-line" />
            Guest Network
            <span className="apply-eyebrow-line" />
          </div>
          <h1 className="apply-title">
            Apply to Join <span className="gradient-text">Viora Elite</span>
          </h1>
          <p className="apply-subtitle">
            Share your profile with Viora Elite and become part of our curated guest network.
            We'll keep you informed about future events, experiences and opportunities relevant to your profile.
          </p>
        </motion.div>

        {/* ── Success State ── */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="apply-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <div className="apply-success-icon">
                <CheckCircle size={32} />
              </div>

              <h2 className="apply-success-title">Application Received</h2>

              <p className="apply-success-body">
                Thank you for sharing your profile with Viora Elite.
              </p>
              <p className="apply-success-body">
                Your details are now part of our guest network. We'll keep you informed
                when relevant Viora Elite events and experiences are announced.
              </p>

              <div className="apply-success-divider" />

              <p className="apply-success-note">
                You may hear from us through email or WhatsApp when we have something relevant for you.
              </p>

              <Link to="/" className="apply-back-btn">
                <ArrowLeft size={15} />
                Back to Viora Elite
              </Link>
            </motion.div>

          ) : (

            /* ── Form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            >
              <div className="apply-form-card">
                <form onSubmit={handleSubmit} noValidate>

                  {/* ─── Section 1: Personal Information ─── */}
                  <div className="form-section">
                    <div className="apply-section-label">Personal Information</div>
                    <div className="form-grid">

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-fullName">
                          Full Name <span className="required-star">*</span>
                        </label>
                        <input
                          id="apply-fullName"
                          type="text"
                          className={`apply-input${errors.fullName && touched.fullName ? ' input-error' : ''}`}
                          placeholder="Your full name"
                          value={form.fullName}
                          onChange={update('fullName')}
                          onBlur={blur('fullName')}
                          autoComplete="name"
                        />
                        {errors.fullName && touched.fullName && (
                          <span className="field-error">{errors.fullName}</span>
                        )}
                      </div>

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-email">
                          Email Address <span className="required-star">*</span>
                        </label>
                        <input
                          id="apply-email"
                          type="email"
                          className={`apply-input${errors.email && touched.email ? ' input-error' : ''}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={update('email')}
                          onBlur={blur('email')}
                          autoComplete="email"
                        />
                        {errors.email && touched.email && (
                          <span className="field-error">{errors.email}</span>
                        )}
                      </div>

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-phone">
                          WhatsApp Number <span className="required-star">*</span>
                        </label>
                        <input
                          id="apply-phone"
                          type="tel"
                          className={`apply-input${errors.phone && touched.phone ? ' input-error' : ''}`}
                          placeholder="+91 9xxxxxxxxx"
                          value={form.phone}
                          onChange={update('phone')}
                          onBlur={blur('phone')}
                          autoComplete="tel"
                        />
                        {errors.phone && touched.phone && (
                          <span className="field-error">{errors.phone}</span>
                        )}
                      </div>

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-city">
                          City <span className="required-star">*</span>
                        </label>
                        <input
                          id="apply-city"
                          type="text"
                          className={`apply-input${errors.city && touched.city ? ' input-error' : ''}`}
                          placeholder="Your city"
                          value={form.city}
                          onChange={update('city')}
                          onBlur={blur('city')}
                          autoComplete="address-level2"
                        />
                        {errors.city && touched.city && (
                          <span className="field-error">{errors.city}</span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* ─── Section 2: Professional Information ─── */}
                  <div className="form-section">
                    <div className="apply-section-label">Professional Information</div>
                    <div className="form-grid">

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-profession">
                          Profession / Occupation <span className="required-star">*</span>
                        </label>
                        <input
                          id="apply-profession"
                          type="text"
                          className={`apply-input${errors.profession && touched.profession ? ' input-error' : ''}`}
                          placeholder="e.g. Architect, Founder, Doctor"
                          value={form.profession}
                          onChange={update('profession')}
                          onBlur={blur('profession')}
                        />
                        {errors.profession && touched.profession && (
                          <span className="field-error">{errors.profession}</span>
                        )}
                      </div>

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-organization">
                          Organization / Company
                        </label>
                        <input
                          id="apply-organization"
                          type="text"
                          className="apply-input"
                          placeholder="Where you work (optional)"
                          value={form.organization}
                          onChange={update('organization')}
                        />
                      </div>

                      <div className="apply-field form-field-full">
                        <label className="apply-label" htmlFor="apply-designation">
                          Designation
                        </label>
                        <input
                          id="apply-designation"
                          type="text"
                          className="apply-input"
                          placeholder="e.g. Senior Partner, Creative Director (optional)"
                          value={form.designation}
                          onChange={update('designation')}
                        />
                      </div>

                    </div>
                  </div>

                  {/* ─── Section 3: Social / Professional Profile ─── */}
                  <div className="form-section">
                    <div className="apply-section-label">Social &amp; Professional Profiles</div>
                    <div className="form-grid">

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-linkedin">
                          LinkedIn URL
                        </label>
                        <input
                          id="apply-linkedin"
                          type="url"
                          className="apply-input"
                          placeholder="https://linkedin.com/in/..."
                          value={form.linkedin}
                          onChange={update('linkedin')}
                        />
                      </div>

                      <div className="apply-field">
                        <label className="apply-label" htmlFor="apply-instagram">
                          Instagram URL
                        </label>
                        <input
                          id="apply-instagram"
                          type="url"
                          className="apply-input"
                          placeholder="https://instagram.com/..."
                          value={form.instagram}
                          onChange={update('instagram')}
                        />
                      </div>

                    </div>
                  </div>

                  {/* ─── Section 4: About You ─── */}
                  <div className="form-section">
                    <div className="apply-section-label">About You</div>
                    <div className="apply-field">
                      <label className="apply-label" htmlFor="apply-applicationMessage">
                        A Little About Yourself
                      </label>
                      <textarea
                        id="apply-applicationMessage"
                        className="apply-textarea"
                        rows={5}
                        placeholder="Tell us a little about yourself and why you would like to be part of the Viora Elite network."
                        value={form.applicationMessage}
                        onChange={update('applicationMessage')}
                      />
                    </div>
                  </div>

                  {/* ─── Consent ─── */}
                  <div>
                    <label className="consent-row">
                      <div className="consent-checkbox-wrapper">
                        <input
                          id="apply-confirmed"
                          type="checkbox"
                          className="consent-checkbox"
                          checked={form.confirmed}
                          onChange={update('confirmed')}
                          onBlur={blur('confirmed')}
                        />
                        <div className="consent-checkbox-visual">
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4L4 7.5L10 1" stroke="#121215" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <span className="consent-text">
                        I agree to receive relevant <strong>Viora Elite</strong> updates, invitations and event notifications
                        through email and WhatsApp.
                      </span>
                    </label>
                    {errors.confirmed && touched.confirmed && (
                      <p className="consent-error">{errors.confirmed}</p>
                    )}
                  </div>

                  {/* ─── API Error Banner ─── */}
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`apply-error-banner${apiError.isDuplicate ? ' is-duplicate' : ''}`}
                    >
                      {apiError.isDuplicate
                        ? 'We already have your profile with Viora Elite. You\'ll continue to receive relevant updates when future events are announced.'
                        : 'Something went wrong while submitting your application. Please try again.'}
                    </motion.div>
                  )}

                  {/* ─── Submit ─── */}
                  <div className="apply-submit-row">
                    <button
                      id="apply-submit-btn"
                      type="submit"
                      className="apply-submit-btn"
                      disabled={submitting}
                    >
                      <span className="btn-label">
                        {submitting ? (
                          <>
                            <span className="spinner" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </span>
                    </button>
                    <p className="apply-privacy-note">
                      Your information is kept private and will only be used by the Viora Elite team.
                    </p>
                  </div>

                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplyPage;
