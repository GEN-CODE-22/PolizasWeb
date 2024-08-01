import { TableFooter } from "@/components/Shared/table-footer";
import { ControlledTable } from "@/components/ui/controlled-table";
import { useUnidades } from "@/hooks/custom/useUnidades";
import React from "react";

export const UnidadesOperativaContent = () => {
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
    unidadesOp,
    updateFilter,
    visibleColumns,
    columns,
    pageSize,
    setPageSize,
    selectedRowKeys,
    handleDelete,
    loading,
  } = useUnidades();

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
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch("");
        },
        onSearchChange: (event) => {
          handleSearch(event.target.value);
        },
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
        enableDrawerFilter: true,
      }}
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
  );
};
