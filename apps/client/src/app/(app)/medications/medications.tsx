"use client";
import { useActionState, Fragment } from "react";
import { Input } from "@reclaim/ui/components/ui/input";
import { Button } from "@reclaim/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@reclaim/ui/components/ui/table";
import { skipToken, useQuery } from "@tanstack/react-query";

import type { Medications } from "#api/openFda/action";
import { sortObjectKeys } from "#utils/sortObjectKeys";
import { mode } from "#utils/mode";
import type { OpenFdaResult, Product } from "#api/openFda/schema";

type MedicationPreview = OpenFdaResult &
  Pick<Product, "brand_name"> &
  Pick<Partial<Product>, "dosage_form" | "route" | "marketing_status">;

export const MedicationsData = ({
  medications,
}: {
  medications: Medications;
}) => {
  const groupedMedications = sortObjectKeys(
    medications.results.reduce<Record<string, MedicationPreview[]>>(
      (acc, result) => {
        new Set(result.products.map((p) => p.brand_name)).forEach(
          (brandName) => {
            acc[brandName] = (acc[brandName] ?? [])
              .concat({
                ...result,
                brand_name: brandName,
                dosage_form: mode(result.products.map((p) => p.dosage_form)),
                route: mode(result.products.map((p) => p.route)),
                marketing_status: mode(
                  result.products.map((p) => p.marketing_status),
                ),
              })
              .toSorted(
                (a, b) =>
                  // If numbers are equal, compare letters
                  a.application_number.id.localeCompare(
                    b.application_number.id,
                  ) ||
                  a.application_number.type.localeCompare(
                    a.application_number.type,
                  ),
              );
          },
        );
        return acc;
      },
      {},
    ),
  );

  return Object.keys(groupedMedications).map((brandName) => (
    <Fragment key={brandName}>
      <TableRow>
        <TableCell colSpan={6} className="font-bold">
          {brandName}
        </TableCell>
      </TableRow>
      {groupedMedications[brandName]?.map((m) => (
        <TableRow
          key={`${m.brand_name}-${m.application_number.type}-${m.application_number.id}`}
        >
          <TableCell>
            {`${m.application_number.type} #${m.application_number.id}`}
          </TableCell>
          <TableCell>{m.brand_name}</TableCell>
          <TableCell>{m.sponsor_name}</TableCell>
          <TableCell>{m.dosage_form}</TableCell>
          <TableCell>{m.route}</TableCell>
          <TableCell>{m.marketing_status}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  ));
};

const MedicationsTable = ({
  fetchMedicationsAction,
}: {
  fetchMedicationsAction: (query: string) => Promise<Medications>;
}) => {
  const [state, formAction] = useActionState<string | undefined, FormData>(
    (prev, formState) => {
      const query = formState.get("medication");
      return typeof query === "string" ? query : prev;
    },
    undefined,
  );
  const { data: medications } = useQuery({
    queryKey: ["medications", state],
    enabled: !!state && state.length >= 3,
    queryFn: state ? () => fetchMedicationsAction(state) : skipToken,
  });

  return (
    <>
      <form className="mb-4 flex" action={formAction}>
        <Input placeholder="Search medications" name="medication" />
        <Button type="submit">Search</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application Number</TableHead>
            <TableHead>Brand Name</TableHead>
            <TableHead>Sponsor</TableHead>
            <TableHead>Dosage Form</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications && <MedicationsData medications={medications} />}
        </TableBody>
      </Table>
    </>
  );
};

export default MedicationsTable;
