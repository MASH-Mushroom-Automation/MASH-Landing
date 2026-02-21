import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton. Accepts any CSS value. */
  width?: string;
  /** Height of the skeleton. Accepts any CSS value. */
  height?: string;
  /** Use fully rounded corners. Default: false */
  rounded?: boolean;
}

/**
 * Skeleton: Loading placeholder with a shimmer animation.
 * Composes well for text lines, cards, images, and avatars.
 *
 * @example
 * <Skeleton className="h-4 w-3/4" />
 * <Skeleton className="h-40 w-full rounded-xl" />
 * <Skeleton width="48px" height="48px" rounded />
 */
export default function Skeleton({
  className,
  width,
  height,
  rounded = false,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}
