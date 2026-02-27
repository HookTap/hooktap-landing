import type { Metadata } from "next";
import HookyFloatingButton from "@/app/components/HookyFloatingButton";

export const metadata: Metadata = {
  title: "Help Center | HookTap",
  description:
    "Get help with HookTap – FAQ, AI assistant Hooky, and direct support.",
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <HookyFloatingButton />
    </>
  );
}
