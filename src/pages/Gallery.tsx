import React from "react";
// TODO: Connect to Firebase Storage for uploads, Firestore for metadata
// TODO: Add consent checkbox, image slider, tags, and ad placeholders
export default function Gallery() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-4">Before & After Gallery</h1>
      <p className="mb-8">Share your journey! Upload your before/after photos (with consent) and see real results from the SkinologyKE community.</p>
      {/* TODO: Upload form, consent, slider, tags, ads */}
      <div className="border rounded-lg p-8 text-center text-muted-foreground">Gallery coming soon. Upload and slider features in progress.</div>
    </div>
  );
}
