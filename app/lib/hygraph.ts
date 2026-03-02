export async function hygraphFetch<T>(query: string, variables = {}, locale: string): Promise<T> {
  const hygraphLocale = locale.toUpperCase();
  
  const url = process.env.HYGRAPH_URL;
  const token = process.env.HYGRAPH_TOKEN;

  if (!url || !token) {
    throw new Error("HYGRAPH_URL or HYGRAPH_TOKEN is missing in environment variables");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.trim()}`,
      "gcms-locales": hygraphLocale,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Lower revalidate for debugging
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
