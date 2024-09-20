import { TableFooter } from "@/components/Shared/table-footer";
import { ControlledTable } from "@/components/ui/controlled-table";
import { usePoliza } from "@/hooks/custom/usePoliza";
import { convertMoney } from "@/utils/tools";
import Table from "rc-table";
import React, { FC } from "react";

export const DetallePoliza = () => {
  const {
    applyFilters,
    checkedColumns,
    columns,
    currentPage,
    filters,
    handleDelete,
    handlePaginate,
    handleReset,
    handleSearch,
    isFiltered,
    loading,
    pageSize,
    data,
    searchTerm,
    selectedRowKeys,
    setCheckedColumns,
    setPageSize,
    setSelectedRowKeys,
    tableData,
    totalItems,
    updateFilter,
    visibleColumns,
  } = usePoliza();

  return (
    <ControlledTable
      variant="modern"
      showLoadingText={loading}
      data={tableData}
      // @ts-ignore
      columns={visibleColumns}
      isLoading={loading}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: (page: number) => handlePaginate(page),
      }}
      // filterOptions={{
      //   searchTerm,
      //   onSearchClear: () => {
      //     handleSearch("");
      //   },
      //   onSearchChange: (event) => {
      //     handleSearch(event.target.value);
      //   },
      //   hasSearched: isFiltered,
      //   columns,
      //   checkedColumns,
      //   setCheckedColumns,
      //   enableDrawerFilter: true,
      // }}
      // filterElement={
      //   <FilterElement
      //     filters={filters}
      //     isFiltered={isFiltered}
      //     updateFilter={updateFilter}
      //     handleReset={handleReset}
      //   />
      // }
      summary={(datos) => (
        <Table.Summary.Row>
          {columns.map((column, index) => (
            <Table.Summary.Cell key={column.key} index={index} align="right">
              {column.key === "importe"
                ? convertMoney(
                    data?.reduce((total, item) => total + item.importe, 0) ?? 0
                  )
                : null}
            </Table.Summary.Cell>
          ))}
        </Table.Summary.Row>
      )}
      tableFooter={
        <TableFooter
          checkedItems={selectedRowKeys}
          handleDelete={(ids: string[]) => {
            setSelectedRowKeys([]);
            handleDelete(ids);
          }}
        />
      }
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
};
