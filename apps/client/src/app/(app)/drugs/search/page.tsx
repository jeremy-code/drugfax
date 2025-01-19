import { Input } from "@reclaim/ui/components/ui/input";
import { Link } from "@reclaim/ui/components/ui/link";
import { Label } from "@reclaim/ui/components/ui/label";
import { Button } from "@reclaim/ui/components/ui/button";
import { redirect } from "next/navigation";
import { z } from "zod";

const DrugsSearchPage = () => {
  return (
    <main className="container my-4">
      <h1 className="prose-2xl mb-2 font-semibold">Drugs</h1>
      <p>
        Search FDA-approved prescription or over-the-counter (OTC) drugs
        approved for human use in the United States based on data from{" "}
        <Link
          className="text-blue-500 dark:text-blue-400"
          isExternal
          href="https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm"
        >
          Drugs@FDA
        </Link>
        .
      </p>

      <form
        action={async (formData) => {
          "use server";
          redirect(`/drugs/results?q=${z.string().parse(formData.get("q"))}`);
        }}
      >
        <Label>Search</Label>
        <Input name="q" />
        <Button>Search</Button>
      </form>
    </main>
  );
};

export default DrugsSearchPage;
