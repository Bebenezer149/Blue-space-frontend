import { Link } from "react-router-dom";

const sections = [
  ["What we collect", "Account, profile, store, customer, delivery, order, payout, verification, support, device, usage and analytics data may be collected depending on how you use Blue Space."],
  ["Why we use data", "We use personal data to operate accounts and storefronts, fulfil orders and services, process or facilitate payments and payouts, prevent fraud, verify users, provide support, analyse platform use, send required or marketing communications, and comply with legal obligations."],
  ["Payment providers", "Moolre may receive payment, payout and verification information needed to support a transaction or payout."],
  ["Delivery-confirmed settlement", "Payment and settlement records are processed through Moolre's merchant settlement flow. This is not a bank escrow or trust account."],
  ["Off-platform transactions", "Data from payments or transactions completed outside Blue Space checkout may not receive Blue Space refund, mediation or platform liability protections."],
  ["Analytics", "PostHog may collect page views, feature usage, page-leave events, frontend exceptions and optional session activity when configured. Form inputs are masked and URL query strings and fragments are removed from tracked URL properties."],
  ["Marketing", "Blue Space may send marketing email, SMS or in-app messages. Transaction, security, verification and delivery messages may still be sent where necessary. Users may opt out of marketing by following the message instructions or contacting support."],
  ["Cookies and local storage", "A separate optional cookie-consent program is not represented unless clearly implemented. Authentication, security or provider storage may use necessary browser storage or provider technologies."],
  ["Service providers", "Personal data may be processed by Moolre, Render, Vercel, Namecheap, Supabase, Cloudinary and PostHog. Professional advisers and competent authorities may receive data where necessary or legally required."],
  ["International processing", "Data may be processed or stored outside Ghana by third-party providers. Reasonable contractual and technical safeguards will be used where required by applicable law."],
  ["Retention", "Account and order records are retained for up to seven years from the latest relevant transaction or account closure, or longer where legal, tax, security, fraud, litigation or dispute requirements apply."],
  ["Security", "Blue Space uses reasonable administrative, technical and organisational safeguards, but no system can guarantee absolute security."],
  ["Data minimisation", "Blue Space does not expose private hostel room numbers, live GPS coordinates or device IMEIs to other users."],
  ["Your rights", "Subject to Ghanaian law, you may request access, correction, deletion, restriction or objection, information about recipients, withdrawal of consent, or a copy of applicable personal data."],
  ["Seller responsibility", "Sellers must use buyer data only for fulfilment, support and lawful transaction purposes. They must not publish, sell or misuse buyer data or retain it for unrelated purposes."],
  ["Complaints", "Privacy questions or rights requests: 0508796463 / 0257913431 / 0539278827, Monday–Saturday, 8:00 AM–8:00 PM GMT."],
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to Blue Space
        </Link>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Effective date: Launch Date</p>
        <p className="mt-6 text-sm leading-7 text-slate-700">
          This Policy explains how Blue Space collects and uses personal data. Blue Space is
          operating while formal business registration is pending. Registered legal name and
          Ghana physical address details will be added after registration.
        </p>

        <div className="mt-8 space-y-7">
          {sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          This document should be reviewed by a Ghana-qualified legal professional after Blue Space
          confirms its registered entity details and backend payment, analytics and retention practices.
        </p>
      </article>
    </main>
  );
}
