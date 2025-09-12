import Header from "@/features/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
