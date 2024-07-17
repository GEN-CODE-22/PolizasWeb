import { Title, Text, Avatar, Button, Popover } from "rizzui";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import cn from "@/utils/class-names";
import { useSelector } from "react-redux";
import { StoreApp } from "@reduxjs/toolkit";
import { AppState } from "@/redux/slices/app";

interface Props {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}

export const ProfileMenu: FC<Props> = ({
  buttonClassName,
  avatarClassName,
  username = false,
}) => {
  const { user, server } = useSelector<StoreApp, AppState>((s) => s.app);

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            // src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            name={user ?? "Usuario"}
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hola, {user}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <div className="w-64 text-left rtl:text-right">
          <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
            <Avatar name={user ?? "Usuario"} />
            <div className="ms-3">
              <Title as="h6" className="font-semibold uppercase">
                {user}
              </Title>
              <Text className="text-gray-600 uppercase">{server}</Text>
            </div>
          </div>

          <div className="border-t border-gray-300 px-6 pb-6 pt-5">
            <Button
              className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
              variant="text"
              onClick={() => signOut()}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </Popover.Content>
    </ProfileMenuPopover>
  );
};

const ProfileMenuPopover = ({ children }: React.PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
};
