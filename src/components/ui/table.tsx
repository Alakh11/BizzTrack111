<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"
=======
import * as React from "react";

import { cn } from "@/lib/utils";
>>>>>>> tempRepo/main

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
<<<<<<< HEAD
))
Table.displayName = "Table"
=======
));
Table.displayName = "Table";
>>>>>>> tempRepo/main

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
<<<<<<< HEAD
))
TableHeader.displayName = "TableHeader"
=======
));
TableHeader.displayName = "TableHeader";
>>>>>>> tempRepo/main

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableBody.displayName = "TableBody"
=======
));
TableBody.displayName = "TableBody";
>>>>>>> tempRepo/main

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"
=======
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";
>>>>>>> tempRepo/main

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"
=======
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
>>>>>>> tempRepo/main

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"
=======
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
>>>>>>> tempRepo/main

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableCell.displayName = "TableCell"
=======
));
TableCell.displayName = "TableCell";
>>>>>>> tempRepo/main

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableCaption.displayName = "TableCaption"
=======
));
TableCaption.displayName = "TableCaption";
>>>>>>> tempRepo/main

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
<<<<<<< HEAD
}
=======
};
>>>>>>> tempRepo/main
