import {
  ArrowRight,
  Check,
  PackageCheck,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const orderSteps = [
  {
    icon: Check,
    title: "Order shared",
    description: "Your order has been shared with the seller.",
    complete: true,
  },
  {
    icon: PackageCheck,
    title: "Seller notified",
    description: "The seller will be notified and will prepare your items for delivery.",
    complete: true,
  },
  {
    icon: ShieldCheck,
    title: "Your money is safe",
    description:
      "Your money is held safely until you receive your package. Confirm delivery using the link in the notification you will receive so the seller can be paid securely.",
    complete: false,
  },
];

function SuccessPage() {
  const { state } = useLocation();
  const storefrontPath = state?.storeSlug
    ? `/store/${encodeURIComponent(state.storeSlug)}`
    : "/marketplace";

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
      />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <Link
          to={storefrontPath}
          className="text-xl font-extrabold tracking-tight text-gradient sm:text-2xl"
        >
          Blue Space
        </Link>
        <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
          <ShieldCheck size={18} className="text-blue-500" />
          <span>Shopping made simple</span>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 pb-10 pt-2 sm:px-8 sm:pb-14">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_80px_-32px_rgba(37,99,235,0.28)]">
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                <Check size={13} strokeWidth={3} />
              </span>
              Order placed successfully
            </div>

            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Great choice.
              <span className="mt-1 block text-blue-600">Your order is in!</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
              Thanks for shopping with Blue Space. The seller has received your
              order and will get it ready for you.
            </p>

            <div className="relative mt-7 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 px-5 py-5 text-center sm:flex-row sm:gap-5 sm:px-8 sm:text-left">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-white/15"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/15"
              />
              <div className="relative z-10 grid h-36 w-36 shrink-0 place-items-center sm:h-40 sm:w-40">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className="success-check h-24 w-24 sm:h-28 sm:w-28"
                  fill="none"
                >
                  <circle
                    className="success-check__circle"
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="rgb(255 255 255 / 0.5)"
                    strokeWidth="4"
                  />
                  <path
                    className="success-check__mark"
                    d="m37 61 16 16 31-34"
                    stroke="white"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="relative z-10 pb-2 sm:pb-0">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  Great Joy, in small things.
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-blue-100 sm:mx-0">
                  Every order supports a small business in the Blue Space
                  community.
                </p>
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:mx-0">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Your order is being taken care of
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    What happens next
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    We’ll keep things moving.
                  </p>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
                  <ShoppingBag size={20} />
                </div>
              </div>

              <ol className="space-y-4">
                {orderSteps.map(({ icon: Icon, title, description, complete }, index) => (
                  <li key={title} className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                          complete
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 bg-white text-slate-400"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      {index < orderSteps.length - 1 && (
                        <span className="mt-1 h-5 w-px bg-slate-200" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-slate-800">
                        {title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/marketplace"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Continue shopping
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-6 text-center text-xs text-slate-400 sm:pb-8">
        Thank you for choosing Blue Space
      </footer>
    </main>
  );
}

export default SuccessPage;