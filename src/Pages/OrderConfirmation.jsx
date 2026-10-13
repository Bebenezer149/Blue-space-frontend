import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
      />

      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="text-xl font-extrabold tracking-tight text-gradient sm:text-2xl"
          >
            Blue Space
          </Link>
          <span className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:inline-flex">
            <ShieldCheck size={18} className="text-blue-500" />
            Buyer order confirmation
          </span>
        </header>

        <Link
          to="/marketplace"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_80px_-32px_rgba(37,99,235,0.28)]">
          <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-6 py-7 text-white sm:px-9 sm:py-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50">
                  <ShieldCheck size={14} />
                  Secure order
                </p>
                <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  Confirm your delivery
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                  Once your package has arrived, confirm delivery so the seller
                  can receive payment.
                </p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <PackageCheck size={27} />
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order reference
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  #BS-1048
                </p>
              </div>
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                CONFIRMED
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CalendarDays size={15} />
                  Order date
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  October 13, 2026
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <MapPin size={15} />
                  Delivery location
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  Accra, Ghana
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Order summary
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">Linen House</p>
                </div>
                <p className="shrink-0 text-sm font-bold text-slate-900">
                  GH₵ 320.00
                </p>
              </div>

              <ul className="mt-4 divide-y divide-slate-100">
                <li className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="min-w-0 truncate font-medium text-slate-700">
                    Linen shirt
                  </span>
                  <span className="shrink-0 text-slate-500">Qty 1</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-800">
                Confirm only after you have received your order and checked
                that everything is in order.
              </div>
              <button
                type="button"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Check size={17} />
                Mark as delivered
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Your confirmation lets the seller know your package has arrived.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrderConfirmation;
