import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Create a new post",
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
