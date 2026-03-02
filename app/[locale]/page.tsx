import { BlogSection } from "@/app/components/BlogSection";
import { LandingPageClient } from "@/app/components/LandingPageClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Render the BlogSection on the server
  const blogSection = <BlogSection locale={locale} />;

  return (
    <LandingPageClient 
      locale={locale} 
      blogSection={blogSection} 
    />
  );
}
