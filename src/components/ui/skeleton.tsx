<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils";
>>>>>>> tempRepo/main

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
<<<<<<< HEAD
  )
}

export { Skeleton }
=======
  );
}

export { Skeleton };
>>>>>>> tempRepo/main
