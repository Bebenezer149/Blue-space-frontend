import Header from "../Components/Header";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Check,
  Clock3,
  Download,
  LockKeyhole,
  MoreHorizontal,
  Smartphone,
} from "lucide-react";

const transactions = [
  {
    reference: "BS-1048",
    description: "Order payment · Linen shirt",
    date: "Today, 10:42 AM",
    amount: "+ GH₵ 320.00",
    type: "escrow",
    status: "Held in escrow",
  },
  {
    reference: "TR-0082",
    description: "Mobile money payout · 024 ••• •• 89",
    date: "Yesterday, 3:18 PM",
    amount: "− GH₵ 500.00",
    type: "payout",
    status: "Completed",
  },
  {
    reference: "BS-1041",
    description: "Order payment · Leather sandals",
    date: "Oct 2, 2026 · 1:06 PM",
    amount: "+ GH₵ 185.00",
    type: "escrow",
    status: "Held in escrow",
  },
  {
    reference: "BS-1037",
    description: "Order payment · Beaded bag",
    date: "Oct 1, 2026 · 9:34 AM",
    amount: "+ GH₵ 240.00",
    type: "payment",
    status: "Released",
  },
];

function StatusBadge({ status }) {
  const styles = {
    "Held in escrow": "bg-amber-50 text-amber-700 ring-amber-200",
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Released: "bg-blue-50 text-blue-700 ring-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status === "Held in escrow" ? (
        <LockKeyhole size={12} />
      ) : (
        <Check size={12} />
      )}
      {status}
    </span>
  );
}

function Transactions() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-medium text-blue-600">Your finances</p>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Transactions
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track order payments, escrow and seller payouts.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:self-auto"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <section
          aria-label="Balance overview"
          className="mb-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr] lg:gap-5"
        >
          <div className="relative overflow-hidden rounded-2xl bg-blue-700 p-5 text-white shadow-sm sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-9 h-44 w-44 rounded-full border border-white/10"
            />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-blue-100">
                  Available to withdraw
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="mr-2 text-xl font-medium text-blue-200 sm:text-2xl">
                    GH₵
                  </span>
                  1,245.00
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-blue-100">
                  <Check size={14} />
                  Ready for payout
                </p>
              </div>
              <div className="flex flex-col gap-4 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-5 text-blue-100">
                  Funds become available after an order is delivered and
                  confirmed.
                </p>
                <a
                  href="#withdraw"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Withdraw funds
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <article className="surface-card flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Held in escrow</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                  <span className="mr-1 text-base font-medium text-gray-500">
                    GH₵
                  </span>
                  860.00
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  3 orders awaiting confirmation
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                <LockKeyhole size={20} />
              </span>
            </article>

            <article className="surface-card flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Paid out</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                  <span className="mr-1 text-base font-medium text-gray-500">
                    GH₵
                  </span>
                  4,580.00
                </p>
                <p className="mt-1 text-xs text-gray-500">Across 12 transfers</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Banknote size={20} />
              </span>
            </article>
          </div>
        </section>

        <section
          id="withdraw"
          aria-labelledby="withdraw-heading"
          className="surface-card mb-6 rounded-2xl border bg-white p-5 sm:p-6"
        >
          <div className="mb-5 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Banknote size={19} />
            </span>
            <div>
              <h2
                id="withdraw-heading"
                className="text-base font-semibold text-gray-900"
              >
                Withdraw to your account
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Send available funds to Mobile Money or a bank account.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-gray-600">
                Payout method
              </span>
              <span className="relative block">
                <Smartphone
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  defaultValue="mtn"
                  aria-label="Payout method"
                  className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="mtn">MTN Mobile Money</option>
                  <option value="telecel">Telecel Cash</option>
                  <option value="at">AT Money</option>
                  <option value="bank">Bank transfer</option>
                </select>
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-gray-600">
                Recipient number or account
              </span>
              <input
                type="text"
                placeholder="e.g. 024 123 4567"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-gray-600">
                Amount
              </span>
              <span className="flex h-11 overflow-hidden rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="grid place-items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-500">
                  GH₵
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="min-w-0 flex-1 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </span>
            </label>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Withdraw
              <ArrowUpRight size={16} />
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Transfers are processed securely. Review the recipient details
            before confirming.
          </p>
        </section>

        <section
          aria-labelledby="history-heading"
          className="surface-card overflow-hidden rounded-2xl border bg-white"
        >
          <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="history-heading"
                  className="text-base font-semibold text-gray-900"
                >
                  Transaction history
                </h2>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  24
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <LockKeyhole size={13} />
                Records are permanent and cannot be deleted.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-600"
              >
                All transactions
                <MoreHorizontal size={15} className="rotate-90" />
              </button>
              <button
                type="button"
                aria-label="Filter transactions"
                className="grid h-9 w-9 place-items-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Clock3 size={16} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100 md:hidden">
            {transactions.map((transaction) => (
              <article key={transaction.reference} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                        transaction.type === "payout"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {transaction.type === "payout" ? (
                        <ArrowUpRight size={17} />
                      ) : (
                        <ArrowDownLeft size={17} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {transaction.date} · {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`shrink-0 text-sm font-semibold ${
                      transaction.amount.startsWith("+")
                        ? "text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>
                <div className="ml-12 mt-2">
                  <StatusBadge status={transaction.status} />
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-gray-50/80 text-xs font-medium text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Transaction</th>
                  <th scope="col" className="px-4 py-3.5">Reference</th>
                  <th scope="col" className="px-4 py-3.5">Date</th>
                  <th scope="col" className="px-4 py-3.5">Status</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {transactions.map((transaction) => (
                  <tr key={transaction.reference} className="hover:bg-gray-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                            transaction.type === "payout"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {transaction.type === "payout" ? (
                            <ArrowUpRight size={17} />
                          ) : (
                            <ArrowDownLeft size={17} />
                          )}
                        </span>
                        <span className="font-medium text-gray-800">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-gray-500">
                      {transaction.reference}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-semibold ${
                        transaction.amount.startsWith("+")
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4 sm:px-6">
            <p className="text-xs text-gray-500">Showing 4 of 24 transactions</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Transactions;
