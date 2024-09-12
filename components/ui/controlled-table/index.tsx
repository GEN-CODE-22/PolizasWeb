import isEmpty from "lodash/isEmpty";
import { Title, Loader } from "rizzui";
import { TableFilter, TableFilterProps } from "./table-filter";
import { TablePagination, TablePaginationProps } from "./table-pagination";
import Table, { TableProps } from "../TableV2";
import cn from "@/utils/class-names";
import { FC } from "react";
import { DefaultRecordType, PanelRender } from "rc-table/lib/interface";

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
  footer?: PanelRender<DefaultRecordType> | undefined;
} & TableProps;

export const ControlledTable: FC<ControlledTableProps> = ({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,

  ...tableProps
}) => {
  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Cargando...
          </Title>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions} data={tableProps.data}>
          {filterElement}
        </TableFilter>
      )}

      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
          // footer={() => (
          //   <div
          //     style={{
          //       textAlign: "right",
          //       padding: "10px",
          //       fontWeight: "bold",
          //     }}
          //   >
          //     Total Cantidad: {10}
          //   </div>
          // )}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
};
