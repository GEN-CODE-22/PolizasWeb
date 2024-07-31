import { CatalogosState, GetCajaCuentas } from "@/redux/slices/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useRouter } from "next/router";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Text, Tooltip } from "rizzui";
import { CajaCuentas } from "@/interfaces";
import { PiNotePencil } from "react-icons/pi";
import { useDrawer } from "@/components/Shared/drawer-views/use-drawer";
import { DrawerHeader } from "@/components/settings/drawer-header";
import { FormCajaCuenta } from "@/components/content/catalogos/CajaCuentas/FormCajaCuenta";
import { AppState } from "@/redux/slices/app";

const filterState = {
  id: 0,
  descripcion: "",
  cve_unidad: "",
};

export const useBancosPlanta = () => {
  const { openDrawer, closeDrawer } = useDrawer();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);

  const { cajaCuentas, loading } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );
  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  useEffect(() => {
    GetData();
  }, [server]);

  const GetData = () => dispatch(GetCajaCuentas());

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const edit = (cajacuenta: CajaCuentas) => {
    openDrawer({
      view: (
        <>
          <DrawerHeader onClose={closeDrawer} />
          <FormCajaCuenta cajaCuenta={cajacuenta} />
        </>
      ),
      placement: "right",
      customSize: "420px",
    });
  };

  // const cancelar = (pago: Pago) => {
  //   router.push(`/pago/${pago.idPago}/cancelar`);
  // };

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
  } = useTable(cajaCuentas, pageSize, filterState);

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
        dataIndex: "num_cta",
        key: "num_cta",
        minWidth: 30,
        flex: 1,
        render: (_: string, row: CajaCuentas) => (
          <Text className="text-sm">{row.num_cta}</Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Clave"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "cta_cta"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("cta_cta"),
        dataIndex: "cta_cta",
        key: "cta_cta",
        minWidth: 80,
        flex: 1,
        render: (_: string, row: CajaCuentas) => (
          <Text className="text-sm">{row.cta_cta}</Text>
        ),
      },
      {
        title: <HeaderCell title="Descripción" />,
        dataIndex: "desc_cta",
        key: "desc_cta",
        minWidth: 100,
        flex: 1,
        render: (value: string) => <Text className="text-sm">{value}</Text>,
      },
      {
        title: <HeaderCell title="Cuenta Contable" />,
        dataIndex: "cont_cta",
        key: "cont_cta",
        minWidth: 10,
        flex: 1,
        render: (value: number, _: CajaCuentas) => (
          <Text className="text-sm">{_.cont_cta?.cuenta ?? "N/A"}</Text>
        ),
      },
      {
        title: <HeaderCell title="Actions" />,
        dataIndex: "action",
        key: "action",
        flex: 1,
        render: (_: string, row: CajaCuentas) => (
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
    cajaCuentas,
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
