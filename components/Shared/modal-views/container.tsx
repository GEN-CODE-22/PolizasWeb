"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ActionIcon, Modal, Text } from "rizzui";
import { useModal } from "./use-modal";
import { PiXBold } from "react-icons/pi";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size, title } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      size={size}
      overlayClassName="backdrop-blur"
      // overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      // containerClassName="dark:bg-gray-100"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      <div className="m-auto px-7 pt-6 pb-8">
        <div className="mb-7 flex items-center justify-between">
          {title && <Text>{title}</Text>}
          <ActionIcon size="sm" variant="text" onClick={closeModal}>
            <PiXBold className="h-auto w-6" strokeWidth={1.8} />
          </ActionIcon>
        </div>
        {view}
      </div>
    </Modal>
  );
}
