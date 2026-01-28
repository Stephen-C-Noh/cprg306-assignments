import Link from "next/link";

export default function Page() {
  return (
    <main>
      <header>
        <h1>CRPG306: Web Development 2 - Assignments</h1>
      </header>
      <p>
        <strong>Week 2:</strong>{' '}
        <Link href="/week-2">
          Week 2
        </Link>
      </p>
      <p>
        <strong>Week 3:</strong>{' '}
        <Link href="/week-3">
          Week 3
        </Link>
      </p>

    </main>
  );
}