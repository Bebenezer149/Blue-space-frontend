import Header from "../Components/Header";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config";
import { toast } from "../toast";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Check,
  Eye,
  LockKeyhole,
  MoreHorizontal,
  Smartphone,
  X,
} from "lucide-react";
import WithdrawalModal from "../Components/Prompts/WithdrawalModal";

// import { setWasmUrl } from "@lottiefiles/dotlottie-react/webgpu";

function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
    PAID: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    REFUNDED: "bg-blue-50 text-blue-700 ring-blue-200",
    DISPUTED: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || "bg-gray-50 text-gray-700 ring-gray-200"}`}
    >
      {status === "PENDING" ? (
        <LockKeyhole size={12} />
      ) : status === "DISPUTED" ? (
        <MoreHorizontal size={12} />
      ) : (
        <Check size={12} />
      )}
      {status}
    </span>
  );
}

function extractPaymentHistory(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.payments)) return response.payments;
  if (Array.isArray(response?.payment_history)) return response.payment_history;
  if (Array.isArray(response?.history)) return response.history;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.payments)) return response.data.payments;
  if (Array.isArray(response?.data?.payment_history)) return response.data.payment_history;
  return [];
}

function formatPaymentDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function normalizePayment(payment, index) {
  const rawStatus = String(
    payment?.status || payment?.payment_status || "PENDING",
  ).trim().toUpperCase();
  const status = ["PENDING", "PAID", "REFUNDED", "DISPUTED"].includes(rawStatus)
    ? rawStatus
    : "PENDING";
  const rawAmount = payment?.amount ?? payment?.total_amount ?? payment?.price ?? 0;
  const numericAmount = Number(String(rawAmount).replace(/,/g, ""));
  const amountValue = Number.isFinite(numericAmount) ? numericAmount : 0;
  const rawReference =
    payment?.reference ||
    payment?.payment_reference ||
    payment?.transaction_reference ||
    payment?.order_reference ||
    payment?.id;
  const description =
    payment?.order_id != null
      ? `Order payment · #${payment.order_id}`
      : "Seller payment";
  const rawType = String(payment?.type || payment?.transaction_type || "").toLowerCase();

  return {
    id: payment?.id ?? null,
    orderId: payment?.order_id ?? null,
    paymentStatus: status,
    createdAt: payment?.created_at ?? null,
    updatedAt: payment?.updated_at ?? null,
    vendorId: payment?.vendor_id ?? null,
    reference: rawReference ? String(rawReference) : `PAY-${index + 1}`,
    description,
    date: formatPaymentDate(
      payment?.created_at ||
      payment?.payment_date ||
      payment?.date ||
      payment?.updated_at,
    ),
    amount: amountValue,
    displayAmount: `${status === "REFUNDED" ? "−" : "+"} GH₵ ${amountValue.toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    type: rawType.includes("payout") || rawType.includes("transfer") ? "payout" : "payment",
    status,
  };
}

function Transactions() {
  const [withdrawalBalance, setWithdrawalBalance] = useState(0.0);
  const [pendingBalance, setPendingBalance] = useState(0.0);
  const [payoutBalance,setPayoutBalance]=useState(0.00)
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);
  const [areBalanceDetailsLoading, setAreBalanceDetailsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [islive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [channel,setChannel]=useState("1");
  const [receiverPhone, setReceiverPhone]=useState("");
  const [amountToWithdraw,setAmountToWithdraw]=useState(0.00)
  const [state,setState]=useState(false)
  const [openModal,setOpenModal]=useState(false)
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isPaymentHistoryLoading, setIsPaymentHistoryLoading] = useState(true);
  const [paymentHistoryError, setPaymentHistoryError] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");
  const [paymentPage, setPaymentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

 
  // const [status, setStatus] = useState("Inactive");

  function openWithdrawalModal() {
    if (!receiverPhone.trim()) {
      toast.error("Enter a recipient phone number.");
      return;
    }

    if (!Number.isFinite(Number(amountToWithdraw)) || Number(amountToWithdraw) <= 0) {
      toast.error("Enter a valid withdrawal amount.");
      return;
    }

    setOpenModal(true);
  }

  function handleWithdrawalSuccess() {
    setState((currentState) => !currentState);
    setOpenModal(false);
  }

  function activateWallet() {
    setIsLoading(true);
    fetch(`${API_URL}/activate-ledger`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast.info(res.message);
        setIsLive(true);
        setIsLoading(false);
      })
      .catch(() => {});
  }

 const fetchSecondaryBalance = useCallback(() => {
    setAreBalanceDetailsLoading(true);
    fetch(`${API_URL}/balance-details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPendingBalance(res.pending_payments);
        setPayoutBalance(res.total_payouts)
      })
      .catch(() => {
        toast.error("Unable to load wallet balances.");
      })
      .finally(() => setAreBalanceDetailsLoading(false));
  }, [token]);

  const fetchBalance = useCallback(() => {
    setIsBalanceLoading(true);
    setAreBalanceDetailsLoading(true);
    fetch(`${API_URL}/ledger`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {

        if (res.status === "live") {
          setIsLive(true);
          setWithdrawalBalance(res.available_balance);
          fetchSecondaryBalance()
        } else {
          setAreBalanceDetailsLoading(false);
        }
      })
      .catch(() => {
        setAreBalanceDetailsLoading(false);
        toast.error("Unable to load wallet balance.");
      })
      .finally(() => setIsBalanceLoading(false));
  }, [fetchSecondaryBalance, token]);

  const fetchPaymentHistory = useCallback(() => {
    setIsPaymentHistoryLoading(true);
    setPaymentHistoryError("");
    setPaymentPage(1);
    fetch(`${API_URL}/payment-history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.json();
        if (!res.ok) {
          throw new Error(response?.message || "Unable to load payment history.");
        }
        setPaymentHistory(
          extractPaymentHistory(response).map(normalizePayment),
        );
      })
      .catch((error) => {
        const message =
          error?.message || "Unable to load payment history.";
        setPaymentHistoryError(message);
        toast.error(message);
      })
      .finally(() => setIsPaymentHistoryLoading(false));
  }, [token]);

 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBalance();
    fetchPaymentHistory();
  }, [fetchBalance, fetchPaymentHistory, state]);

  const filteredPaymentHistory =
    paymentStatusFilter === "ALL"
      ? paymentHistory
      : paymentHistory.filter(
          (transaction) => transaction.status === paymentStatusFilter,
        );
  const paymentsPerPage = 5;
  const totalPaymentPages = Math.max(
    1,
    Math.ceil(filteredPaymentHistory.length / paymentsPerPage),
  );
  const safePaymentPage = Math.min(paymentPage, totalPaymentPages);
  const paginatedPaymentHistory = filteredPaymentHistory.slice(
    (safePaymentPage - 1) * paymentsPerPage,
    safePaymentPage * paymentsPerPage,
  );

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
                Track order payments, holdings and  payouts.
              </p>
            </div>
            <button
              onClick={activateWallet}
              type="button"
              className="inline-flex cursor-pointer min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:self-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
              {isLoading ?(
                <div className="flex items-center gap-3 justify-evenly">
                  <span>Activating...</span><span className="p-1 h-5 w-5 border-b-2 animate-spin rounded-full"></span>
                </div>
              ) : "Activate Wallet"}
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
                <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" aria-busy={isBalanceLoading}>
                  <span className="mr-2 text-xl font-medium text-blue-200 sm:text-2xl">
                    GH₵
                  </span>
                  {isBalanceLoading ? (
                    <span className="inline-block h-9 w-28 animate-pulse rounded bg-white/25 align-middle sm:h-10" aria-label="Loading available balance" />
                  ) : withdrawalBalance}
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
                <div
                  className={`inline-flex min-h-8 items-center justify-center border w-1/4 gap-2 rounded-lg  px-4 text-sm font-semibold ${islive ? "text-green-500" : "text-red-500"} transition hover:bg-blue-50`}
                >
                  {islive ? "Live" : "Inactive"}
                  <div
                    className={`rounded-full h-2 w-2 ${islive ? "bg-green-400" : "bg-red-500"} animate-pulse`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <article className="surface-card flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Held in escrow
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900" aria-busy={areBalanceDetailsLoading}>
                  <span className="mr-1 text-base font-medium text-gray-500">
                    GH₵
                  </span>
                  {areBalanceDetailsLoading ? (
                    <span className="inline-block h-7 w-20 animate-pulse rounded bg-gray-200 align-middle" aria-label="Loading escrow balance" />
                  ) : pendingBalance}
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
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900" aria-busy={areBalanceDetailsLoading}>
                  <span className="mr-1 text-base font-medium text-gray-500">
                    GH₵
                  </span>
                  {areBalanceDetailsLoading ? (
                    <span className="inline-block h-7 w-20 animate-pulse rounded bg-gray-200 align-middle" aria-label="Loading paid out balance" />
                  ) : payoutBalance}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Across 12 transfers
                </p>
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
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  aria-label="Payout method"
                  className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="1">MTN Mobile Money</option>
                  <option value="2">Telecel Cash</option>
                  <option value="3">AT Money</option>
                  <option value="4">Bank transfer</option>
                </select>
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-gray-600">
                Recipient number or account
              </span>
              <input
                type="text"
                onChange={(e)=>setReceiverPhone(e.target.value)}
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
                  onChange={(e)=>setAmountToWithdraw(e.target.value)}
                  placeholder="0.00"
                  className="min-w-0 flex-1 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </span>
            </label>

            <button
              type="button"
              onClick={openWithdrawalModal}
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
                  {isPaymentHistoryLoading ? "..." : paymentHistory.length}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <LockKeyhole size={13} />
                Records are permanent and cannot be deleted.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="payment-status-filter">
                Filter payment history
              </label>
              <select
                id="payment-status-filter"
                value={paymentStatusFilter}
                onChange={(event) => {
                  setPaymentStatusFilter(event.target.value);
                  setPaymentPage(1);
                }}
                className="h-9 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-600"
              >
                <option value="ALL">All transactions</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="REFUNDED">Refunded</option>
                <option value="DISPUTED">Disputed</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-100 md:hidden">
            {isPaymentHistoryLoading && (
              <p className="px-5 py-8 text-center text-sm text-gray-500">
                Loading payment history...
              </p>
            )}
            {!isPaymentHistoryLoading && paymentHistoryError && (
              <p className="px-5 py-8 text-center text-sm text-red-600">
                {paymentHistoryError}
              </p>
            )}
            {!isPaymentHistoryLoading && !paymentHistoryError && filteredPaymentHistory.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-500">
                No payment history found.
              </p>
            )}
            {!isPaymentHistoryLoading && !paymentHistoryError && paginatedPaymentHistory.map((transaction) => (
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
                      transaction.status === "REFUNDED"
                        ? "text-red-700"
                        : "text-gray-900"
                    }`}
                  >
                    {transaction.displayAmount}
                  </p>
                </div>
                <div className="ml-12 mt-2">
                  <StatusBadge status={transaction.status} />
                  <button
                    type="button"
                    onClick={() => setSelectedPayment(transaction)}
                    aria-label={`View payment ${transaction.reference}`}
                    className="ml-2 inline-grid h-8 w-8 place-items-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-gray-50/80 text-xs font-medium text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Transaction
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Reference
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {isPaymentHistoryLoading && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      Loading payment history...
                    </td>
                  </tr>
                )}
                {!isPaymentHistoryLoading && paymentHistoryError && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-red-600">
                      {paymentHistoryError}
                    </td>
                  </tr>
                )}
                {!isPaymentHistoryLoading && !paymentHistoryError && filteredPaymentHistory.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No payment history found.
                    </td>
                  </tr>
                )}
                {!isPaymentHistoryLoading && !paymentHistoryError && paginatedPaymentHistory.map((transaction) => (
                  <tr
                    key={transaction.reference}
                    className="hover:bg-gray-50/70"
                  >
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
                        transaction.status === "REFUNDED"
                          ? "text-red-700"
                          : "text-gray-900"
                    }`}
                    >
                      {transaction.displayAmount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(transaction)}
                        aria-label={`View payment ${transaction.reference}`}
                        className="inline-grid h-9 w-9 place-items-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4 sm:px-6">
            <p className="text-xs text-gray-500">
              {filteredPaymentHistory.length === 0
                ? "Showing 0 transactions"
                : `Showing ${(safePaymentPage - 1) * paymentsPerPage + 1}-${Math.min(
                    safePaymentPage * paymentsPerPage,
                    filteredPaymentHistory.length,
                  )} of ${filteredPaymentHistory.length} transactions`}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaymentPage((current) => Math.max(1, current - 1))}
                disabled={safePaymentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-gray-500">
                {safePaymentPage} / {totalPaymentPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPaymentPage((current) =>
                    Math.min(totalPaymentPages, current + 1),
                  )
                }
                disabled={safePaymentPage === totalPaymentPages}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
              <button
                type="button"
                onClick={fetchPaymentHistory}
                disabled={isPaymentHistoryLoading}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPaymentHistoryLoading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </section>
       
          
        
      </main>
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-details-heading"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPayment(null);
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2
                  id="payment-details-heading"
                  className="text-base font-semibold text-gray-900"
                >
                  Payment details
                </h2>
                <p className="mt-1 font-mono text-xs text-gray-500">
                  {selectedPayment.reference}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                aria-label="Close payment details"
                className="grid h-9 w-9 place-items-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4 px-5 py-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">Amount</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {selectedPayment.displayAmount}
                </p>
                <div className="mt-3">
                  <StatusBadge status={selectedPayment.status} />
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs text-gray-500">Payment ID</dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    {selectedPayment.id ?? "Unavailable"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Order ID</dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    {selectedPayment.orderId ?? "Unavailable"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Vendor ID</dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    {selectedPayment.vendorId ?? "Unavailable"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Payment status</dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    {selectedPayment.paymentStatus}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-gray-500">Created</dt>
                  <dd className="mt-1 text-gray-900">
                    {formatPaymentDate(selectedPayment.createdAt)}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-gray-500">Updated</dt>
                  <dd className="mt-1 text-gray-900">
                    {formatPaymentDate(selectedPayment.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <WithdrawalModal
          receiverPhone={receiverPhone}
          channel={channel}
          amountToWithdraw={amountToWithdraw}
          onClose={() => setOpenModal(false)}
          onSuccess={handleWithdrawalSuccess}
        />
      )}
    </div>
  );
}

export default Transactions;
