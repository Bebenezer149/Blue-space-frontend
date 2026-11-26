import { Link } from "react-router-dom";

const sections = [
  ["Platform role", "Blue Space is a campus-focused marketplace connecting buyers with independent local sellers and service providers. Blue Space is not the seller or direct provider of listed goods and services."],
  ["Verification labels", "A label such as Identity Checked describes only the basic check actually completed. It does not certify licensing, professional qualification, quality or a guarantee of every listing."],
  ["Off-platform payments", "Orders and bookings started or negotiated on Blue Space must be paid through official checkout or an accepted in-app Revised Quote. Off-platform deals receive no mediation, refund or platform liability and may lead to account penalties."],
  ["Accounts and security", "Users must be at least 18, provide accurate information and protect credentials. Blue Space staff never request PINs, passwords, OTPs, private hostel rooms or device IMEIs."],
  ["Seller and provider rules", "Listings must be accurate. Sellers keep stock and fulfil orders; providers use booking links, state scope and exclusions, and submit completion evidence."],
  ["Commission", "Sellers and providers keep 97% of completed item or service prices. Blue Space deducts 3% only on completed sales; failed, cancelled, unfulfilled or fully refunded sales earn no commission."],
  ["Payouts", "Cleared earnings may be withdrawn from GH₵5.00 without a minimum balance lock. Moolre charges 1%, minimum GH₵0.50 and maximum GH₵10.00 per transfer."],
  ["Checkout fees", "Buyers see item or service price, applicable delivery or taxes, the Blue Space 2% fee capped at GH₵5.00, and Moolre processing charges before payment."],
  ["Delivery-confirmed settlement", "Payment is held in Moolre's merchant settlement flow until delivery or completion is confirmed. It is not a bank escrow account or trust. Buyer confirmation or an operational 48-hour window may unlock the seller payout, subject to statutory rights."],
  ["Refunds", "Full refunds or cancellation apply before dispatch or service start, for non-delivery or cancellation, and for damaged, defective, fake or materially misdescribed orders. Statutory cooling-off periods and listed hygiene, custom, perishable and completed-service exceptions apply."],
  ["Refund timing", "Approved refunds target initiation within three business days, subject to Moolre confirmation. Mobile network or bank receipt may take additional time. Blue Space never forces store credit."],
  ["Disputes", "Support acknowledges cases within one business day, allows two business days for a response, freezes only the disputed order, and aims to issue a written decision within five business days after complete evidence. One appeal is allowed within seven calendar days."],
  ["Prohibited conduct", "Illegal or counterfeit goods, stolen property, prohibited weapons or drugs, unsafe services, fraud, phishing, harassment and infringing content are prohibited."],
  ["Support", "0508796463 / 0257913431 / 0539278827, Monday–Saturday, 8:00 AM–8:00 PM GMT."],
  ["Legal review", "Registration is pending. Complete the registered entity details after registration and obtain Ghana-qualified legal review before public launch."],
];

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to Blue Space
        </Link>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Terms and Conditions</h1>
        <p className="mt-2 text-sm text-slate-500">Effective date: Launch Date</p>
        <p className="mt-6 text-sm leading-7 text-slate-700">
          Blue Space is operating while formal business registration is pending.
          These Terms apply to the website, marketplace, storefronts, service booking links,
          account services, payments, delivery-confirmed settlement and payouts.
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
          completes business registration and before live public launch.
        </p>
      </article>
    </main>
  );
}
