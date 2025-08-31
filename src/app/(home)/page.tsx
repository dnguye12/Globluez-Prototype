import { caller } from "@/trpc/server";

export default async function Home() {
  const greeting = await caller.hello()

  return (
    <>ss
      <p>{greeting.greeting}</p>
    </>
  );
}
