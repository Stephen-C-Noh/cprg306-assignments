import Link from "next/link";

export default function StudentInfo() {
  return (
    <div>
      <h2>Student Information</h2>
      <p><strong>Name:</strong> Stephen Changbeom Noh</p>
      <p>
        <strong>GitHub Repository:</strong>{' '}
        <Link href="https://github.com/Stephen-C-Noh/cprg306-assignments">
          CPRG306 assignments Repository
        </Link>
      </p>
    </div>
  );
}