import { TableFooter } from "@/components/Shared/table-footer";
import { ControlledTable } from "@/components/ui/controlled-table";
import { useCuentasContable } from "@/hooks/custom/useCuentasContable";

import React from "react";
import { Button } from "rizzui";

export const CuentasContableContent = () => {
  const {
    applyFilters,
    checkedColumns,
    currentPage,
    filters,
    handlePaginate,
    handleReset,
    handleSearch,
    isFiltered,
    searchTerm,
    setCheckedColumns,
    setSelectedRowKeys,
    tableData,
    totalItems,
    cuentasContable,
    updateFilter,
    visibleColumns,
    columns,
    pageSize,
    setPageSize,
    selectedRowKeys,
    handleDelete,
    loading,
    edit,
  } = useCuentasContable();
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button onClick={() => edit()}>Agregar Cuenta</Button>
      </div>
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
        indentSize={10}
        // filterElement={
        //   <FilterElement
        //     filters={filters}
        //     isFiltered={isFiltered}
        //     updateFilter={updateFilter}
        //     handleReset={handleReset}
        //   />
        // }
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
    </div>
  );
};
