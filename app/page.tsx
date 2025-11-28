import { redirect } from "next/navigation";

export default function Home() {
  // redirect otomatis ke login page
  redirect("/login");
  return null; // tidak ada tampilan karena langsung redirect
}
