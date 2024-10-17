import Link from "next/link";
import cn from "@/utils/class-names";
import SimpleBar from "@/components/ui/simplebar";
import { SidebarMenu } from "./sidebar-menu";
import { Logo } from "@/components/logo";
import { FC } from "react";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-slate-800  2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 bg-slate-800 2xl:px-8 2xl:pt-6">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  );
};
