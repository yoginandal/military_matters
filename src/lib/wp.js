let BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!BASE) {
  throw new Error(
    'NEXT_PUBLIC_WORDPRESS_API_URL environment variable is not set. ' +
    'Please add it to your .env.local file. Example: NEXT_PUBLIC_WORDPRESS_API_URL=http://72.61.236.218'
  );
}

// Normalize BASE URL: remove trailing slash, query strings, and paths
// This ensures BASE is just the domain (e.g., http://72.61.236.218)
BASE = BASE.trim();
// Remove query string if present
const queryIndex = BASE.indexOf('?');
if (queryIndex !== -1) {
  BASE = BASE.substring(0, queryIndex);
}
// Remove hash if present
const hashIndex = BASE.indexOf('#');
if (hashIndex !== -1) {
  BASE = BASE.substring(0, hashIndex);
}
// Remove trailing slash
BASE = BASE.replace(/\/+$/, '');

// Helper function to build WordPress REST API URL
// Supports both formats: /?rest_route= and /wp-json/
function buildWpApiUrl(endpoint, params = {}) {
  // Try wp-json format first (modern WordPress)
  let url = `${BASE}/wp-json/wp/v2/${endpoint}`;
  const queryParams = new URLSearchParams();
  
  // Add parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  
  return url;
}

// Fallback function using ?rest_route= format (legacy/pretty permalinks disabled)
function buildWpApiUrlLegacy(endpoint, params = {}) {
  let url = `${BASE}/?rest_route=/wp/v2/${endpoint}`;
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  if (queryParams.toString()) {
    url += `&${queryParams.toString()}`;
  }
  
  return url;
}

export async function getAllPosts() {
  // Try modern format first
  let url = buildWpApiUrl('posts', { _embed: '', per_page: 50 });
  let res = await fetch(url, { next: { revalidate: 60 } });
  
  // If that fails, try legacy format
  if (!res.ok) {
    console.warn(`[WP API] Modern format failed (${res.status}), trying legacy format...`);
    url = buildWpApiUrlLegacy('posts', { _embed: '', per_page: 50 });
    res = await fetch(url, { next: { revalidate: 60 } });
  }
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error response');
    throw new Error(
      `Failed to fetch posts: ${res.status} ${res.statusText}. ` +
      `URL: ${url}. ` +
      `Response: ${errorText.substring(0, 200)}`
    );
  }
  return res.json();
}

export async function getCategories() {
  let url = buildWpApiUrl('categories', { per_page: 100 });
  let res = await fetch(url);
  
  if (!res.ok) {
    url = buildWpApiUrlLegacy('categories', { per_page: 100 });
    res = await fetch(url);
  }
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error response');
    throw new Error(
      `Failed to fetch categories: ${res.status} ${res.statusText}. ` +
      `URL: ${url}. ` +
      `Response: ${errorText.substring(0, 200)}`
    );
  }
  return res.json();
}

export async function getTags() {
  let url = buildWpApiUrl('tags', { per_page: 100 });
  let res = await fetch(url);
  
  if (!res.ok) {
    url = buildWpApiUrlLegacy('tags', { per_page: 100 });
    res = await fetch(url);
  }
  
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error response');
    throw new Error(
      `Failed to fetch tags: ${res.status} ${res.statusText}. ` +
      `URL: ${url}. ` +
      `Response: ${errorText.substring(0, 200)}`
    );
  }
  return res.json();
}

export function findIdBySlug(items, slug) {
  const item = items.find((i) => i.slug === slug);
  return item && item.id;
}

// NEW: single post by slug
export async function getPostBySlug(slug) {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug provided to getPostBySlug');
  }
  
  // Normalize slug - WordPress slugs are typically lowercase with hyphens
  const normalizedSlug = slug.trim().toLowerCase();
  
  let url = buildWpApiUrl('posts', { slug: normalizedSlug, _embed: '' });
  let res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    url = buildWpApiUrlLegacy('posts', { slug: normalizedSlug, _embed: '' });
    res = await fetch(url, { next: { revalidate: 60 } });
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error response');
    throw new Error(
      `Failed to fetch post: ${res.status} ${res.statusText}. ` +
      `URL: ${url}. ` +
      `Response: ${errorText.substring(0, 200)}`
    );
  }
  
  const data = await res.json();
  
  // WordPress API returns an array - find the exact match by slug
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  
  // Find the post that matches the slug exactly (case-insensitive)
  const post = data.find(p => 
    p.slug && p.slug.toLowerCase() === normalizedSlug
  );
  
  // If no exact match found, return the first result (fallback)
  // But log a warning if the slug doesn't match
  if (!post) {
    console.warn(
      `[WP API] No exact slug match found for "${normalizedSlug}". ` +
      `Found ${data.length} post(s), using first result. ` +
      `Available slugs: ${data.map(p => p.slug).join(', ')}`
    );
    return data[0];
  }
  
  // Verify the slug matches (double-check)
  if (post.slug.toLowerCase() !== normalizedSlug) {
    console.warn(
      `[WP API] Slug mismatch: requested "${normalizedSlug}", got "${post.slug}"`
    );
  }
  
  return post;
}
