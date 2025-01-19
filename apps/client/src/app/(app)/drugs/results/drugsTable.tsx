"use no memo";
"use client";
import { use, useMemo, type CSSProperties } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
  type AggregationFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@reclaim/ui/components/ui/table";
import { cn } from "@reclaim/ui/utils";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronRight,
} from "lucide-react";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { useRouter } from "next/navigation";

import type { Drug } from "#api/openFda/drugsFda/action";
import type { Product } from "#api/openFda/drugsFda/schema";
import { mode } from "#utils/mode";
import { formatList } from "#utils/formatList";
import { ColumnResizer } from "#components/table/ColumnResizer";
import { OptionsButton } from "#components/table/OptionsButton";

declare module "@tanstack/react-table" {
  interface AggregationFns {
    mode: AggregationFn<unknown>;
  }
}
type DrugProduct = Product & Pick<Drug, "application_number" | "sponsor_name">;

const columnHelper = createColumnHelper<DrugProduct>();

const columns = [
  columnHelper.accessor("brand_name", {
    header: "Brand Name",
    size: 310,
    minSize: 105,
  }),
  columnHelper.accessor(
    (row) => `${row.application_number.type} #${row.application_number.id}`,
    {
      id: "application_number",
      header: "App. #",
      size: 200,
      sortingFn: (a, b) =>
        a.original.application_number.id.localeCompare(
          b.original.application_number.id,
        ) ||
        a.original.application_number.type.localeCompare(
          b.original.application_number.type,
        ),
    },
  ),
  columnHelper.accessor("sponsor_name", { header: "Sponsor Name", size: 210 }),
  columnHelper.accessor(
    (row) =>
      formatList(
        row.active_ingredients.map(({ name, strength }) =>
          strength === undefined ? name : `...${strength}`,
        ),
        { options: { type: "unit" } },
      ),
    {
      id: "active_ingredients",
      header: "Active Ingredients",
      size: 240,
      aggregationFn: (_, leafRows) =>
        formatList(
          new Set(
            leafRows
              .flatMap((row) => row.original.active_ingredients)
              .map(({ name }) => name),
          ),
          { options: { type: "unit" } },
        ),
    },
  ),
  columnHelper.accessor("dosage_form", {
    header: "Dosage Form",
    aggregationFn: "mode",
  }),
  columnHelper.accessor("route", {
    header: "Route",
    aggregationFn: "mode",
    size: 100,
  }),
  columnHelper.accessor("marketing_status", {
    header: "Status",
    aggregationFn: "mode",
  }),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modeAggregationFn: AggregationFn<any> = (columnId, leafRows) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access -- Based on external `aggregationFns` type
  mode(leafRows.map((row) => row.original[columnId]));

export const DrugsTable = ({
  drugsPromise,
}: {
  drugsPromise: Promise<Drug[]>;
}) => {
  const drugs = use(drugsPromise);
  const drugProducts = useMemo(
    () =>
      drugs.flatMap((drug) =>
        drug.products.map<DrugProduct>((product: Product) => ({
          ...product,
          application_number: drug.application_number,
          sponsor_name: drug.sponsor_name,
        })),
      ),
    [drugs],
  );
  const table = useReactTable({
    data: drugProducts,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      grouping: ["brand_name", "application_number"],
      sorting: [
        { id: "brand_name", desc: false },
        { id: "application_number", desc: false },
      ],
    },
    aggregationFns: { mode: modeAggregationFn },
    enableMultiSort: true,
    isMultiSortEvent: () => true,
  });
  const router = useRouter();

  return (
    <>
      <Table
        className="w-[--table-width] [table-layout:fixed]"
        style={
          {
            "--table-width": `${table.getCenterTotalSize()}px`,
          } as CSSProperties
        }
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader
                  className="relative w-[--header-width] text-ellipsis"
                  key={header.id}
                  colSpan={header.colSpan}
                  style={
                    {
                      "--header-width": `${header.getSize()}px`,
                    } as CSSProperties
                  }
                >
                  {!header.isPlaceholder ?
                    <div className="flex items-center justify-between gap-1">
                      <div>
                        {header.column.getCanSort() ?
                          <button
                            className="flex items-center gap-2"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getIsSorted() === "asc" ?
                              <ArrowDownWideNarrow size={16} />
                            : header.column.getIsSorted() === "desc" ?
                              <ArrowUpNarrowWide size={16} />
                            : null}
                          </button>
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        }
                      </div>
                      {header.column.getCanGroup() && (
                        <OptionsButton column={header.column} />
                      )}
                    </div>
                  : null}
                  <ColumnResizer header={header} />
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                className={cn({
                  "cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900":
                    !row.getIsGrouped(),
                })}
                onClick={
                  row.getIsGrouped() ? undefined : (
                    () =>
                      router.push(
                        `/drugs/${row.original.application_number.type}/${row.original.application_number.id}`,
                      )
                  )
                }
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className="w-[--cell-width] overflow-hidden text-ellipsis"
                      style={
                        {
                          "--cell-width": `${cell.column.getSize()}px`,
                        } as CSSProperties
                      }
                    >
                      {cell.getIsGrouped() ?
                        <>
                          <button
                            className={cn(
                              "flex w-full flex-row items-center gap-2",
                              {
                                "cursor-pointer": row.getCanExpand(),
                              },
                            )}
                            onClick={row.getToggleExpandedHandler()}
                          >
                            <AccessibleIcon
                              label={
                                row.getIsExpanded() ? "Collapse" : "Expand"
                              }
                            >
                              <ChevronRight
                                className={cn(
                                  "size-3 shrink-0 transition-transform duration-300",
                                  { "rotate-90": row.getIsExpanded() },
                                )}
                              />
                            </AccessibleIcon>
                            <span className="shrink truncate text-left">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                              {` (${row.subRows.length})`}
                            </span>
                          </button>
                        </>
                      : cell.getIsAggregated() ?
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      : !cell.getIsPlaceholder() ?
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
