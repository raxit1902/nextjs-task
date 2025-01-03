import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Detail",
  description: "Post Detail Page",
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
