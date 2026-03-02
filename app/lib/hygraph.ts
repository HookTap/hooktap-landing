export async function hygraphFetch<T>(query: string, variables: any = {}, locale: string): Promise<T> {
  const hygraphLocale = locale.toUpperCase(); // DE or EN
  
  const url = process.env.HYGRAPH_URL;
  const token = process.env.HYGRAPH_TOKEN;

  if (!url || !token) {
    throw new Error("HYGRAPH_URL or HYGRAPH_TOKEN is missing in environment variables");
  }

  // We add the locale to the variables to ensure Next.js creates 
  // a unique cache entry for each language.
  const extendedVariables = {
    ...variables,
    __locale: hygraphLocale // Forces unique cache key per locale
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.trim()}`,
      "gcms-locales": hygraphLocale, // Standard Hygraph localization header
    },
    body: JSON.stringify({ 
      query, 
      variables: extendedVariables 
    }),
    next: { 
      revalidate: 60,
      tags: [`hygraph-${locale}`] 
    },
  });

  const responseBody = await res.json();

  if (responseBody.errors) {
    console.error("Hygraph URL:", url);
    console.error("Requested Locale:", hygraphLocale);
    console.error("GraphQL Errors:", JSON.stringify(responseBody.errors, null, 2));
    throw new Error(`GraphQL query errors: ${responseBody.errors[0].message}`);
  }

  return responseBody.data;
}
