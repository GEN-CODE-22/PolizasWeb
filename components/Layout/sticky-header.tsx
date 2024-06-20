import React from "react";
import cn from "@/utils/class-names";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { FC } from "react";

type StickyHeaderProps = {
  className?: string;
  offset?: number;
  children: React.ReactNode;
};

export const StickyHeader: FC<StickyHeaderProps> = ({
  offset = 2,
  className,
  children,
}) => {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6",
        ((isMounted && windowScroll.y) as number) > offset ? "card-shadow" : "",
        className
      )}
    >
      {children}
    </header>
  );
};
