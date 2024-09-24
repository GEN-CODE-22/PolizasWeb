import cn from "@/utils/class-names";
import Link from "next/link";
import { PiHeadsetBold } from "react-icons/pi";
import SimpleBar from "simplebar-react";
import { CarbonSidebarMenu } from "./carbon-sidebar-menu";
import { Logo } from "@/components/logo";
import { WorkSpaceSwitcher } from "./work-space-switcher";
import { NeedSupport } from "./need-support";
import { FC } from "react";

interface Props {
  className?: string;
}

export const CarbonSidebar: FC<Props> = ({ className }) => {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-slate-900  2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40  px-6 pb-5 pt-5  2xl:px-8 2xl:pt-6">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-white hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <WorkSpaceSwitcher
        className="px-6 pb-3.5 pt-3.5 bg-slate-900 text-white"
        suffixClassName="text-white w-5 h-5"
      />

      <SimpleBar
        className={cn(
          "h-[calc(100%-265px)] [&_.simplebar-content]:flex [&_.simplebar-content]:h-full [&_.simplebar-content]:flex-col [&_.simplebar-content]:justify-between"
        )}
      >
        <CarbonSidebarMenu />

        <div className="sticky bottom-0 bg-slate-900 ">
          <NeedSupport
            title="Necesitas Soporte?"
            text="Contacta a Julio Gonzalez de Sistemas."
            prefixIcon={<PiHeadsetBold className="h-5 w-5 text-gray-400" />}
            // className="relative mx-6 before:absolute before:-start-6 before:bottom-full before:end-0 before:h-10 before:w-[calc(100%+48px)] before:bg-gradient-to-t before:from-gray-0 before:to-gray-0/30 before:dark:from-gray-50 before:dark:to-gray-50/30"
            className="relative mx-6 before:absolute before:-start-6 before:bottom-full before:end-0 before:h-10 before:w-[calc(100%+48px)] bg-white"
          />
        </div>
      </SimpleBar>

      {/* <div className="bg-gray-0 px-6 pb-3 dark:bg-gray-50">
        <ProfileCardMenu
          title={user}
          designation={server}
          placement="top"
          avatarClassName="!w-10 !h-10"
          icon={
            <PiDotsThreeVerticalBold
              className={cn(
                "h-7 w-7 text-gray-400 transition-all group-hover:text-primary"
              )}
            />
          }
          className={cn("mt-5 px-0 py-0")}
          buttonClassName="border-0 !border-t !border-gray-200 pt-5 px-0 rounded-none"
        />
      </div> */}
    </aside>
  );
};
