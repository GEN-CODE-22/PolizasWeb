import { CatalogosState, GetUnidadesOp } from "@/redux/slices/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useRouter } from "next/router";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";
import { UnidadOp } from "@/interfaces";
import { PiNotePencil } from "react-icons/pi";
import { useDrawer } from "@/components/Shared/drawer-views/use-drawer";
import { DrawerHeader } from "@/components/settings/drawer-header";
import { FormUnidadO } from "@/components/content/catalogos/UnidadesOperativa/FormUnidadO";
import { AppState } from "@/redux/slices/app";

const filterState = {
  id: 0,
  descripcion: "",
  cve_unidad: "",
};

export const useUnidades = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [pageSize, setPageSize] = useState(10);

  const { openDrawer, closeDrawer } = useDrawer();

  const { unidadesOp, loading } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );

  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  useEffect(() => {
    GetData();
  }, [server]);

  const GetData = () => dispatch(GetUnidadesOp());

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(async (id: string) => {
    handleDelete(id);
  }, []);

  let {
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
    applyFilters,
  } = useTable(unidadesOp, pageSize, filterState);

  const edit = async (unidadOP: UnidadOp) => {
    openDrawer({
      view: (
        <>
          <DrawerHeader onClose={closeDrawer} />
          <FormUnidadO unidad={unidadOP} />
        </>
      ),
      placement: "right",
      customSize: "420px",
    });
  };

  const columns = useMemo(
    () => [
      {
        title: (
          <HeaderCell
            title="Id"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "id"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("id"),
        dataIndex: "id",
        key: "id",
        minWidth: 30,
        flex: 1,
        render: (_: string, row: UnidadOp) => (
          <Text className="text-sm">{row.id}</Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Clave"
            sortable
            ascending={
              sortConfig?.direction === "asc" &&
              sortConfig?.key === "cve_unidad"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("cve_unidad"),
        dataIndex: "cve_unidad",
        key: "cve_unidad",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: UnidadOp) => (
          <Text className="text-sm">{row.cve_unidad}</Text>
        ),
      },
      {
        title: <HeaderCell title="Descripción" />,
        dataIndex: "descripcion",
        key: "descripcion",

        minWidth: 100,
        flex: 1,
        render: (value: string) => <Text className="text-sm">{value}</Text>,
      },
      {
        title: <HeaderCell title="Principal" />,
        dataIndex: "principal",
        key: "principal",
        minWidth: 10,
        flex: 1,
        render: (value: number, _: UnidadOp) => (
          <Checkbox checked={value === 1} disabled />
        ),
      },
      {
        title: <HeaderCell title="Actions" />,
        dataIndex: "action",
        key: "action",
        flex: 1,
        render: (_: string, row: UnidadOp) => (
          <div className="flex items-center gap-3 pe-4">
            <Tooltip
              size="sm"
              content={"Editar"}
              placement="top"
              color="invert"
            >
              <ActionIcon size="sm" variant="outline" onClick={() => edit(row)}>
                <PiNotePencil className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          </div>
        ),
      },
    ],
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ] // columns will only update if data changes
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return {
    unidadesOp,
    visibleColumns,
    checkedColumns,
    setCheckedColumns,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    handleReset,
    applyFilters,
    setSelectedRowKeys,
    columns,
    setPageSize,
    pageSize,
    selectedRowKeys,
    handleDelete,
    loading,
  };
};
