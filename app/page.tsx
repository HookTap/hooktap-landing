import { redirect } from "next/navigation";

// Root redirect – the middleware handles locale-based routing,
// but this serves as a fallback.
export default function RootPage() {
  redirect("/en");
}
