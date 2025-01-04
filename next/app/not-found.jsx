import BtnPrimary from "@/components/BtnPrimary";
import { fetchData } from "@/lib/utils";
import { notFoundDataSchema } from "@/lib/schemas";

export default async function NotFound() {
  const endpoint = "/api/not-found?populate=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = notFoundDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Not Found page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { banner } = data.data;

  return (
    <main className="overflow-hidden relative">
      <section className="triangle-path bg-neutral-100 py-16 relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-1/4 after:h-full after:bg-neutral-200/50">
        <div className="relative mx-auto max-w-5xl px-4 text-center z-10">
          <h1 className="text-gray-900 font-extrabold text-3xl sm:text-4xl tracking-tight text-center mb-4">{banner.headline}</h1>
          <p className="text-gray-700 text-lg mb-7">{banner.supportiveText}</p>
          <BtnPrimary
            className="w-full sm:w-auto"
            label="Return to Home"
            url="/"
          />
        </div>
      </section>
    </main>
  )
}
