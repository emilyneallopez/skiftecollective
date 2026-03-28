"use client";

import { redirect } from "next/navigation";

// Individual message route redirects to the main messages page
// In a production app, this would load the specific conversation
export default function MessageDetailPage() {
  redirect("/messages");
}
