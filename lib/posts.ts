import { query } from "@/lib/db";

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
};

// Public read paths are hit on every homepage/blog request by anonymous
// visitors, so a DB outage (e.g. Postgres not deployed/reachable yet) must
// degrade to an empty list rather than crashing the whole page — the rest
// of the homepage (Hero, Projects, About, Contact) has nothing to do with
// the blog and shouldn't go down with it. Admin-facing functions below are
// intentionally left to throw, since a logged-in admin should see DB errors
// directly rather than have them hidden.
export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  try {
    const result = limit
      ? await query<Post>(
          "SELECT * FROM posts WHERE published = true ORDER BY created_at DESC LIMIT $1",
          [limit]
        )
      : await query<Post>(
          "SELECT * FROM posts WHERE published = true ORDER BY created_at DESC"
        );
    return result.rows;
  } catch (error) {
    console.error("getPublishedPosts failed:", error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  try {
    const result = await query<Post>(
      "SELECT * FROM posts WHERE slug = $1 AND published = true",
      [slug]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    console.error("getPublishedPostBySlug failed:", error);
    return null;
  }
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
  const result = await query<Post>("SELECT * FROM posts ORDER BY created_at DESC");
  return result.rows;
}

export async function getPostByIdForAdmin(id: number): Promise<Post | null> {
  const result = await query<Post>("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

export async function createPost(data: PostInput): Promise<Post> {
  const result = await query<Post>(
    `INSERT INTO posts (slug, title, excerpt, content, tags)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.slug, data.title, data.excerpt, data.content, data.tags]
  );
  return result.rows[0];
}

export async function updatePost(id: number, data: PostInput): Promise<Post | null> {
  const result = await query<Post>(
    `UPDATE posts
     SET slug = $2, title = $3, excerpt = $4, content = $5, tags = $6, updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [id, data.slug, data.title, data.excerpt, data.content, data.tags]
  );
  return result.rows[0] ?? null;
}

export async function deletePost(id: number): Promise<void> {
  await query("DELETE FROM posts WHERE id = $1", [id]);
}

export async function setPublished(id: number, published: boolean): Promise<void> {
  await query("UPDATE posts SET published = $2, updated_at = now() WHERE id = $1", [
    id,
    published,
  ]);
}
