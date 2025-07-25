import React from "react";
export default function Referral() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-4">Dermatologist Referral</h1>
      <p className="mb-8">Need expert help? Fill out our referral form or chat with a dermatologist on WhatsApp.</p>
      {/* Google Form embed */}
      <div className="mb-8">
        <iframe
          title="Referral Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLEFORMURL/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >Loading…</iframe>
      </div>
      {/* WhatsApp deep link */}
      <div className="mb-8 text-center">
        <a
          href="https://wa.me/254700000000?text=Hi%20SkinologyKE%2C%20I%20need%20a%20dermatologist%20referral"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700"
        >
          Chat on WhatsApp
        </a>
      </div>
      {/* Contact list */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Panel Dermatologists</h2>
        <ul className="list-disc pl-6">
          <li>Dr. Amina Otieno – <a href="tel:+254712345678" className="text-blue-600 underline">+254 712 345678</a></li>
          <li>Dr. John Mwangi – <a href="tel:+254798765432" className="text-blue-600 underline">+254 798 765432</a></li>
        </ul>
      </div>
      {/* TODO: Firestore integration for storing referrals, automate notifications */}
    </div>
  );
}
