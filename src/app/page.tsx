import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          AnchorNet
        </h1>
        <p className="mt-2 text-xl text-zinc-400">
          Liquidity Network
        </p>
        <p className="mt-8 text-zinc-300 leading-relaxed">
          A liquidity coordination network for Stellar anchors — efficient
          cross-anchor settlement and liquidity sharing. This app will integrate
          with the AnchorNet API and Stellar wallet for payments and routing.
        </p>
        <div className="mt-12 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Open dashboard
          </Link>
          <a
            href="https://github.com/AnchorNet-Org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
          >
            Learn more
          </a>
        </div>
      </main>
    </div>
  );
}
