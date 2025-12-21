const BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getAllPosts() {
  const res = await fetch(
    `${BASE}/?rest_route=/wp/v2/posts&_embed&per_page=50`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/?rest_route=/wp/v2/categories&per_page=100`);
  return res.json();
}

export async function getTags() {
  const res = await fetch(`${BASE}/?rest_route=/wp/v2/tags&per_page=100`);
  return res.json();
}

export function findIdBySlug(items, slug) {
  const item = items.find((i) => i.slug === slug);
  return item && item.id;
}

// NEW: single post by slug
export async function getPostBySlug(slug) {
  const res = await fetch(
    `${BASE}/?rest_route=/wp/v2/posts&slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data[0]; // undefined if slug not found
}
