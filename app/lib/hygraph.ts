export async function hygraphFetch<T>(query: string, variables: any = {}, locale: string): Promise<T> {
  // Use lowercase as defined in routing.ts (en, de)
  const hygraphLocale = locale.toLowerCase(); 
  
  const url = process.env.HYGRAPH_URL;
  const token = process.env.HYGRAPH_TOKEN;

  if (!url || !token) {
    throw new Error("HYGRAPH_URL or HYGRAPH_TOKEN is missing in environment variables");
  }

  // LOGGING for debugging - this will show up in your terminal
  console.log(`>>> HYGRAPH FETCH: locale="${hygraphLocale}" | slug="${variables.slug || 'list'}"`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.trim()}`,
      // Some Hygraph setups prefer lowercase or a list
      "gcms-locales": `${hygraphLocale}, en`, 
    },
    body: JSON.stringify({ 
      query, 
      variables 
    }),
    // TEMPORARILY DISABLE CACHE to ensure we see the language change
    cache: 'no-store',
  });

  const responseBody = await res.json();

  if (responseBody.errors) {
    console.error("GraphQL Errors:", JSON.stringify(responseBody.errors, null, 2));
    throw new Error(`GraphQL query errors: ${responseBody.errors[0].message}`);
  }

  return responseBody.data;
}
