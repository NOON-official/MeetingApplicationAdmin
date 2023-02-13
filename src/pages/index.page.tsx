import BaseLayout from "@/layouts/BaseLayout";
import Link from "next/link";

const IndexPage = () => (
  <BaseLayout title="Home | Next.js + TypeScript">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </BaseLayout>
);

export default IndexPage;
