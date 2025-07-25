import React from "react";
// TODO: Integrate Flutterwave/Paystack SDK
export default function PaymentStub({ amount }: { amount: number }) {
  return (
    <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Pay KSh {amount} (Payment integration coming soon)</button>
  );
}
