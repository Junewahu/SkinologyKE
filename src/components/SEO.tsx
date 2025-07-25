import React from "react";
import { Helmet } from "react-helmet";
// TODO: Add OpenGraph, Twitter Card, and schema.org tags
export default function SEO({ title, description }: { title: string, description: string }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* TODO: Add more SEO tags */}
    </Helmet>
  );
}
