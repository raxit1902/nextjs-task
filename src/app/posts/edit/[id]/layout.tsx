import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Post Edit',
  description: 'Post Edit Page',
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}