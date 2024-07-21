import ContactInfo from "./_components/contactInfo";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  return (
    <main className="min-h-screen max-w-4xl">
      <ContactInfo />
      TEST
    </main>
  );
}