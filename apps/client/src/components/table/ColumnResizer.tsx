import { cn } from "@reclaim/ui/utils";
import { type RowData, type Header as HeaderType } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import type { PrimitivePropsWithRef } from "@radix-ui/react-primitive";
import { Slot, Slottable } from "@radix-ui/react-slot";

type ColumnResizerProps<TData extends RowData, TValue> = {
  header: HeaderType<TData, TValue>;
} & PrimitivePropsWithRef<"div">;

export const ColumnResizer = <TData extends RowData, TValue>({
  header,
  asChild,
  className,
  children,
  ...props
}: ColumnResizerProps<TData, TValue>) => {
  const { table } = header.getContext();
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      role="presentation"
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(
        "absolute inset-y-2 w-1 cursor-col-resize touch-none select-none",
        "after:absolute after:inset-x-px after:inset-y-0 after:rounded after:bg-[hsl(var(--border))] hover:rounded-full hover:bg-blue-500 hover:after:invisible",
        {
          "bg-blue-500 after:invisible rounded": header.column.getIsResizing(),
          "-right-0.5 group-last:right-2":
            table.options.columnResizeDirection === "ltr",
          "-left-0.5": table.options.columnResizeDirection === "rtl",
          "data-[resizer-dir=ltr]:translate-x-[--resizer-offset] data-[resizer-dir=rtl]:-translate-x-[--resizer-offset] transition-transform":
            table.options.columnResizeMode === "onEnd",
        },
        className,
      )}
      data-resizer-dir={table.options.columnResizeDirection}
      style={
        {
          "--resizer-offset":
            (
              table.options.columnResizeMode === "onEnd" &&
              header.column.getIsResizing()
            ) ?
              `${table.getState().columnSizingInfo.deltaOffset ?? 0}px`
            : "0px",
        } as CSSProperties
      }
      {...props}
    >
      <input
        type="range"
        className="sr-only"
        aria-orientation="horizontal"
        aria-label="Resizer"
        min={header.column.columnDef.minSize}
        max={header.column.columnDef.maxSize}
        value={header.column.getSize()}
        aria-valuetext={`${header.column.getSize()} pixels`}
        readOnly
      />
      <Slottable>{children}</Slottable>
    </Comp>
  );
};
