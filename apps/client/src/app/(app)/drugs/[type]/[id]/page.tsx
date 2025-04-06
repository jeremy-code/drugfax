import {
  Breadcrumb,
  BreadcrumbCurrentLink,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@drugfax/ui/components/ui/breadcrumb";
import { Badge } from "@drugfax/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@drugfax/ui/components/ui/card";
import Link from "next/link";
import { Button } from "@drugfax/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@drugfax/ui/components/ui/table";

import { FdaLogo } from "./_assets/FdaLogo";
import { DailyMed } from "./_assets/DailyMed";

import { ApplicationId } from "#api/openFda/schema";
import { fetchDrugAction } from "#api/openFda/endspoints/drugsFda/action";
import { dayjs } from "#utils/date";
import { formatList } from "#utils/formatList";
import { formatUrlWithSearchParams } from "#utils/formatUrlWithSearchParams";

const DrugPage = async ({ params }: { params: Promise<ApplicationId> }) => {
  const { type, id } = ApplicationId.parse(await params);
  const drug = await fetchDrugAction({ type, id });

  const documents = (drug.submissions ?? [])
    .flatMap((submission) =>
      (submission.application_docs ?? []).map((doc) => ({
        ...doc,
        ...submission,
        date: dayjs(doc.date),
      })),
    )
    .toSorted((a, b) => b.date.diff(a.date));

  return (
    <>
      <div className="w-full border-b py-4 shadow">
        <Breadcrumb className="container">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/drugs/search">Drugs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbCurrentLink>
                {type} #{id}
              </BreadcrumbCurrentLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="container py-8">
        <h1 className="prose-2xl mb-2">
          <span>{`${type} #${id}`}</span>
        </h1>

        <menu className="my-2 flex flex-wrap gap-4">
          <li>
            <a
              href={formatUrlWithSearchParams(
                `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm`,
                { event: "overview.process", ApplNo: id },
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="gap-2 bg-[#0073B5]">
                <FdaLogo className="h-[1em]" />
                View on Drugs@FDA
              </Button>
            </a>
          </li>
          <li>
            <a
              href={formatUrlWithSearchParams(
                `https://dailymed.nlm.nih.gov/dailymed/search.cfm`,
                { adv: "1", query: `APPLICATION_NUMBER:(${type}${id})` },
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="gap-2 bg-[#FFEBD8] text-[#FB7C00] hover:bg-[#FFDCBA] hover:text-[#FB7C00]">
                <DailyMed className="z-10 h-[1em]" />
                View on DailyMed
              </Button>
            </a>
          </li>
        </menu>

        <h2 className="prose-xl ">Drug Details</h2>
        <div className="flex flex-col gap-8 pb-8 pt-4 sm:flex-row">
          <div>
            <p className="font-bold">Sponsor Name</p>
            <p>{drug.sponsor_name}</p>
          </div>
          <div>
            <p className="font-bold">Application Type</p>
            <p>
              {type}
              {type === "ANDA" ?
                " (Generic)"
              : type === "NDA" ?
                " (Brand Name)"
              : null}
            </p>
          </div>
          <div>
            <p className="font-bold">Application ID</p>
            <p>{id}</p>
          </div>
          <div>
            <p className="font-bold"># of Products</p>
            <p>{drug.products.length}</p>
          </div>
          <div>
            <p className="font-bold"># of Submissions</p>
            <p>{drug.submissions?.length ?? 0}</p>
          </div>
        </div>

        <h2 className="prose-xl">OpenFDA Details</h2>
        {drug.openfda === undefined ?
          <p className="italic text-muted-foreground">
            No OpenFDA data available...
          </p>
        : <div className="grid grid-cols-4 gap-8 pb-8 pt-4">
            {(
              [
                ["brand_name", "Brand Name(s)"],
                ["generic_name", "Generic Name(s)"],
                ["manufacturer_name", "Manufacturer(s)"],
                ["product_type", "Product Type(s)"],
                ["substance_name", "Substance Name(s)"],
                ["unii", "UNII(s)"],
              ] as const
            ).map(([key, label]) => {
              const value = new Set(drug.openfda?.[key]);

              return (
                <div key={key}>
                  <p className="font-bold">{label}</p>
                  {value.size === 0 ?
                    <p className="italic text-muted-foreground">N/A</p>
                  : value.size === 1 ?
                    <p>{value.values().next().value}</p>
                  : <ul className="list-inside list-disc">
                      {Array.from(value).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  }
                </div>
              );
            })}
          </div>
        }

        <h2 className="prose-xl my-4">Products</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Product Number</TableHeader>
              <TableHeader>Drug Name</TableHeader>
              <TableHeader>Reference Drug</TableHeader>
              <TableHeader>Active Ingredients</TableHeader>
              <TableHeader>Strength</TableHeader>
              <TableHeader>Dosage Form</TableHeader>
              <TableHeader>Route</TableHeader>
              <TableHeader>Marketing Status</TableHeader>
              <TableHeader>TE Code</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {drug.products
              .toSorted((a, b) =>
                a.product_number.localeCompare(b.product_number),
              )
              .map((product) => (
                <TableRow key={product.product_number}>
                  <TableCell>{product.product_number}</TableCell>
                  <TableCell>{product.brand_name}</TableCell>
                  <TableCell>{`${product.reference_drug}`}</TableCell>
                  <TableCell>
                    {formatList(
                      product.active_ingredients.map(({ name }) => name),
                      { options: { type: "unit" } },
                    )}
                  </TableCell>
                  <TableCell>
                    {formatList(
                      product.active_ingredients.map(
                        ({ strength }) => strength ?? "",
                      ),
                      { options: { type: "unit" } },
                    )}
                  </TableCell>
                  <TableCell>{product.dosage_form}</TableCell>
                  <TableCell>{product.route}</TableCell>
                  <TableCell>{product.marketing_status}</TableCell>
                  <TableCell>{product.te_code}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <h2 className="prose-xl my-4">Documents</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-4">
          {documents.length === 0 ?
            <p className="italic text-muted-foreground">
              No documents available...
            </p>
          : documents.map((doc) => (
              <Card
                className="group flex flex-col hover:bg-muted"
                asChild
                key={`${doc.submission_type}-${doc.submission_number}-${doc.id}`}
              >
                <a href={doc.url}>
                  <CardHeader className="grow">
                    <Badge
                      variant="secondary"
                      className="self-start group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                    >
                      {doc.submission_type}
                    </Badge>
                    <CardTitle className="max-w-full overflow-x-clip text-ellipsis">
                      {doc.title ??
                        new URL(doc.url).pathname.split("/").at(-1) ??
                        doc.url}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <span className="font-bold">ID:</span> {doc.id}
                    </p>
                    <p>
                      <span className="font-bold">Type:</span> {doc.type}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {doc.date.format("LL")}
                    </p>
                  </CardContent>
                </a>
              </Card>
            ))
          }
        </div>
      </main>
    </>
  );
};

export default DrugPage;
