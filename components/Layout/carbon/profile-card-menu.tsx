import { Avatar, Button, Popover, Title, Text } from "rizzui";
import cn from "@/utils/class-names";
import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Placement } from "@floating-ui/react";
import { signOut } from "next-auth/react";

type ProfileCardMenuProps = {
  className?: string;
  buttonClassName?: string;
  avatarClassName?: string;
  placement?: Placement;
  icon?: ReactNode;
  title?: string;
  designation?: string;
  initial?: string;
  image?: string;
};

const DropdownMenu: FC<ProfileCardMenuProps> = ({
  image,
  initial,
  title,
  designation,
}) => {
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={image && image}
          name={title! && title}
          initials={initial && initial}
        />
        <div className="ms-3">
          {/* {title && (
            <Title as="h6" className="font-semibold">
              {title}
            </Title>
          )}
          {designation && <Text className="text-gray-600">{designation}</Text>} */}

          <Button
            className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
            variant="text"
            onClick={() => signOut()}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProfileCardMenu: FC<ProfileCardMenuProps> = ({
  className,
  buttonClassName,
  avatarClassName,
  placement = "bottom-start",
  icon,
  title,
  designation,
  image,
  initial = "P",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={cn("px-6 py-5", className)}>
        <Popover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          shadow="sm"
          placement={placement}
        >
          <Popover.Trigger>
            <Button
              variant="outline"
              className={cn(
                "flex-items-center group flex h-auto w-full max-w-full justify-between gap-3 border-2 border-gray-100 px-5 py-3.5 text-left",
                buttonClassName
              )}
            >
              <span className="flex items-center gap-3">
                <div>
                  <Avatar
                    src={image && image}
                    name={title!}
                    initials={initial && initial}
                    size="sm"
                    className={cn(avatarClassName)}
                  />
                </div>
                <span className="flex max-w-[120px] flex-col">
                  {title && (
                    <Title
                      as="h6"
                      className="text-sm font-semibold text-gray-900 uppercase"
                    >
                      {title}
                    </Title>
                  )}
                  {designation && (
                    <Text className="truncate text-gray-600">
                      {designation}
                    </Text>
                  )}
                </span>
              </span>
              {icon && icon}
            </Button>
          </Popover.Trigger>

          <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
            <DropdownMenu
              image={image}
              initial={initial}
              title={title}
              designation={designation}
            />
          </Popover.Content>
        </Popover>
      </div>
    </>
  );
};
