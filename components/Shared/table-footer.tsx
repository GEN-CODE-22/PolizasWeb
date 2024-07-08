import { FC } from "react";
import { Button, Text } from "rizzui";

interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export const TableFooter: FC<React.PropsWithChildren<TableFooterProps>> = ({
  checkedItems,
  handleDelete,
  children,
}) => {
  if (checkedItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm   0">
      <div>
        <Text as="strong">{checkedItems.length}</Text> selected{" "}
        <Button
          size="sm"
          variant="text"
          className="underline"
          color="danger"
          onClick={() => {
            handleDelete(checkedItems);
          }}
        >
          Delete Them
        </Button>
      </div>
      {children}
    </div>
  );
};
