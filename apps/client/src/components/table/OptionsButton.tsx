import { EllipsisVertical } from "lucide-react";
import { AccessibleIcon } from "radix-ui";
import { Button } from "@reclaim/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@reclaim/ui/components/ui/dropdown-menu";
import type { Column, RowData } from "@tanstack/react-table";

export const OptionsButton = <TData extends RowData, TValue>({
  column,
}: {
  column: Column<TData, TValue>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-6 cursor-pointer">
          <AccessibleIcon.Root label="Options">
            <EllipsisVertical size={16} />
          </AccessibleIcon.Root>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => column.toggleSorting(false, true)}>
            Sort by ASC
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true, true)}>
            Sort by DESC
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={column.getToggleGroupingHandler()}>
            {`${column.getIsGrouped() ? "Ungroup" : "Group"} by ${column.id}`}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
