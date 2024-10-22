import { TableFooter } from "@/components/Shared/table-footer";
import { ControlledTable } from "@/components/ui/controlled-table";
import { usePolizasList } from "@/hooks/custom/usePolizasList";
import React, { FC, memo } from "react";
import { FilterElement } from "./FilterElement";
import { Button } from "rizzui";
import { Poliza } from "@/interfaces/Poliza";

interface Props {
  tipo?: string;
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
    dataExcel,
    isPendingPostPS,
    onPostearPolizas,
    GetDataPolizas,
  } = usePolizasList(tipo);

  return (
    <div className="block space-y-4">
      {isPendingPostPS && (
        <div className="flex justify-end">
          <Button onClick={onPostearPolizas}>Mandar a PS</Button>
        </div>
      )}
      <ControlledTable
        variant="modern"
        showLoadingText={loading}
        data={tableData}
        onClickResult={GetDataPolizas}
        // @ts-ignore
        columns={visibleColumns}
        isLoading={loading}
        rowClassName={(item) => {
          let poliza: Poliza = { ...(item as any) };

          var importe = poliza.detalles?.reduce((t, i) => t + i.importe, 0);

          // Redondea el valor para evitar problemas de precisión
          const precision = 4; // Número de decimales que quieres mantener
          importe = parseFloat(importe.toFixed(precision));

          let cuadra = importe === 0;
          if (!cuadra) {
            return "!bg-red-100 hover:none";
          }
          return "";
        }}
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
          dataExcel,
          nameFileExcel: "Reporte-Polizas.xlsx",
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
    </div>
  );
};
