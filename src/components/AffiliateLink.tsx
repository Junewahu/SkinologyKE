import React from "react";
// TODO: Replace href with real affiliate link
export default function AffiliateLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{children}</a>
  );
}
