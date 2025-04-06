import { Suspense } from "react";
import { z } from "zod";
import { Skeleton } from "@drugfax/ui/components/ui/skeleton";

import { DrugsTable } from "./drugsTable";

import { fetchDrugsAction } from "#api/openFda/endspoints/drugsFda/action";

const SearchParams = z.object({ q: z.string() });

const DrugResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const query = SearchParams.parse(await searchParams).q;
  const drugsPromise = fetchDrugsAction(query);

  return (
    <main className="container flex flex-col py-8">
      <h1 className="prose-2xl mb-4 font-semibold">Drug Search Results</h1>
      <div className="flex flex-1 items-stretch">
        <Suspense fallback={<Skeleton />}>
          <DrugsTable drugsPromise={drugsPromise} />
        </Suspense>
      </div>
    </main>
  );
};

export default DrugResultsPage;
