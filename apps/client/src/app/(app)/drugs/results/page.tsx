import { z } from "zod";

import { DrugsTable } from "./drugsTable";

import { fetchDrugsAction } from "#api/openFda/drugsFda/action";

const SearchParams = z.object({ q: z.string() });

const DrugResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const query = SearchParams.parse(await searchParams).q;
  const drugsPromise = fetchDrugsAction(query);

  return (
    <main className="container py-8">
      <h1 className="prose-2xl mb-2 font-semibold">Drugs Search Results</h1>
      <DrugsTable drugsPromise={drugsPromise} />
    </main>
  );
};

export default DrugResultsPage;
