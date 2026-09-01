import BackButton from "@/components/ux/back-button";

export default function Blog() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 md:text-9xl">Coming Soon...</h1>
      <BackButton fallbackHref="/" />
    </div>
  );
}
