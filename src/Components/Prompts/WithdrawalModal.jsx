import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  LoaderCircle,
  X,
} from "lucide-react";
import { toast } from "../../toast";
import { API_URL } from "../../config";

function WithdrawalModal({
  channel,
  receiverPhone,
  amountToWithdraw,
  onClose,
  onSuccess,
}) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [verifiedName, setVerifiedName] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();

    async function verifyRecipient() {
      setIsVerifying(true);
      setVerificationError("");

      try {
        const response = await fetch(`${API_URL}/verify-name`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone_number: receiverPhone,
            channel: String(channel),
          }),
          signal: controller.signal,
        });
        const contentType = response.headers.get("content-type") || "";
        const result = contentType.includes("application/json")
          ? await response.json()
          : null;

        if (!response.ok) {
          throw new Error(
            result?.message || `Identity verification failed (${response.status}).`,
          );
        }

        // const recipientName = result?.data?.original?.body;
        // if (typeof recipientName !== "string" || !recipientName.trim()) {
        //   throw new Error("Recipient name doesn't exist for this network.");
        // }

        // setVerifiedName(recipientName.trim());
      } catch (error) {
        if (!controller.signal.aborted) {
          setVerificationError(
            error.message || "Unable to verify this recipient.",
          );
          toast.error(error.message || "Unable to verify this recipient.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsVerifying(false);
        }
      }
    }

    verifyRecipient();
    return () => controller.abort();
  }, [channel, receiverPhone, token, verificationAttempt]);

  async function handleConfirmTransfer() {
    if (isVerifying || verificationError || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/transfer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          channel: String(channel),
          receiver: receiverPhone,
          amount: amountToWithdraw,
          idempotency_key: crypto.randomUUID(),
        }),
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        throw new Error(
          result?.message || `Withdrawal failed (${response.status}).`,
        );
      }

      toast.success("Withdrawal successful");
      console.log(result)
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Unable to process the withdrawal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdrawal-modal-title"
        aria-describedby="withdrawal-modal-description"
        className="animate-modal-in relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                <LockKeyhole size={21} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                  Secure payout
                </p>
                <h2
                  id="withdrawal-modal-title"
                  className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
                >
                  Confirm withdrawal
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close withdrawal dialog"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={19} />
            </button>
          </div>

          <p
            id="withdrawal-modal-description"
            className="mt-5 text-sm leading-6 text-slate-600"
          >
            Confirm your identity before we send your funds to your selected
            payout account.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs font-medium text-slate-500">Recipient</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                {receiverPhone}
              </p>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs font-medium text-slate-500">Amount</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                GH₵ {Number(amountToWithdraw).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
            {isVerifying ? (
              <div className="flex items-start gap-3.5">
                <LoaderCircle
                  aria-hidden="true"
                  size={20}
                  className="mt-0.5 shrink-0 animate-spin text-blue-600"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Verifying your identity
                  </p>
                </div>
              </div>
            ) : verificationError ? (
              <div className="flex items-start gap-3.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-100 text-red-700">
                  <X size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    We couldn’t verify this recipient
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {verificationError}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setVerificationAttempt((attempt) => attempt + 1)
                    }
                    className="mt-3 text-xs font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
                  >
                    Try verification again
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Identity verified
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {verifiedName || "Recipient details confirmed"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs leading-5 text-slate-500">
            <LockKeyhole size={14} className="shrink-0 text-slate-400" />
            Your account details are protected and encrypted.
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmTransfer}
              disabled={isVerifying || !!verificationError || isSubmitting}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
            >
              {isSubmitting ? "Processing withdrawal..." : "Confirm transfer"}
              {isSubmitting ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WithdrawalModal;
