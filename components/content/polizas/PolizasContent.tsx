import { TableFooter } from "@/components/Shared/table-footer";
import { ControlledTable } from "@/components/ui/controlled-table";
import { usePolizasList } from "@/hooks/custom/usePolizasList";
import React, { FC } from "react";
import { FilterElement } from "./FilterElement";

interface Props {
  tipo: string;
}

export const PolizasContent: FC<Props> = ({ tipo }) => {
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
    polizas,
    searchTerm,
    selectedRowKeys,
    setCheckedColumns,
    setPageSize,
    setSelectedRowKeys,
    tableData,
    totalItems,
    updateFilter,
    visibleColumns,
  } = usePolizasList(tipo);

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
      onRow={(d) => {
        return {
          ...d,
          onClick: () => console.log(d),
        };
      }}
      filterElement={
        <FilterElement
          filters={filters}
          isFiltered={isFiltered}
          updateFilter={updateFilter}
          handleReset={handleReset}
        />
      }
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