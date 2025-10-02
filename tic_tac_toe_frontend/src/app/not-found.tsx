import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb]">
      <section
        className="card max-w-lg w-full overflow-hidden"
        role="alert"
        aria-live="assertive"
      >
        <header className="header px-6 py-5">
          <h1 className="title text-2xl font-semibold tracking-tight">
            404 — Page Not Found
          </h1>
          <p className="subtitle mt-1 text-sm">
            The page you’re looking for doesn’t exist.
          </p>
        </header>
        <div className="px-6 pb-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-600/15 active:bg-blue-600/20 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </section>
    </main>
  );
}
