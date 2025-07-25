import React, { useState } from "react";
// TODO: Connect to Firestore or email for feedback storage
export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form className="my-8 p-4 border rounded-lg" onSubmit={e => {e.preventDefault(); setSubmitted(true);}}>
      <label className="block mb-2 font-semibold">Product/User Feedback</label>
      <textarea className="w-full border rounded p-2 mb-2" rows={3} placeholder="Your feedback..." required />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit</button>
      {submitted && <div className="mt-2 text-green-600">Thank you for your feedback!</div>}
    </form>
  );
}
