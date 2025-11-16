import { redirect } from "next/navigation";

export default function BlogPage() {
  // Keep legacy /blog URL working but move everything to /news
  redirect("/news");
}
