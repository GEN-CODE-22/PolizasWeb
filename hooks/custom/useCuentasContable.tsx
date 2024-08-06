import { CatalogosState, deleteCuentaC } from "@/redux/slices/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Text, Tooltip } from "rizzui";
import { CuentasContable, UnidadOp } from "@/interfaces";
import { PiNotePencil, PiTrashDuotone } from "react-icons/pi";
import { DrawerHeader } from "@/components/settings/drawer-header";
import { FormCuentaC } from "@/components/content/catalogos/CuentasContable/FormCuentaC";
import { useDrawer } from "@/components/Shared/drawer-views/use-drawer";
import { RemoveCuentaC } from "@/helpers/catalogos";
import toast from "react-hot-toast";

const filterState = {
  id: 0,
  descripcion: "",
  cve_unidad: "",
};

export const useCuentasContable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { openDrawer, closeDrawer } = useDrawer();

  const [pageSize, setPageSize] = useState(10);

  const { cuentasContable, loading } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const edit = (cuentaC?: CuentasContable) => {
    openDrawer({
      view: (
        <>
          <DrawerHeader onClose={closeDrawer} />
          <FormCuentaC cuentaC={cuentaC} />
        </>
      ),
      placement: "right",
      customSize: "420px",
    });
  };

  const deleteCuenta = async (cuenta: CuentasContable) => {
    toast.loading("Eliminando Cuenta 🕔");
    const remove = await RemoveCuentaC(cuenta);

    if (!!remove) dispatch(deleteCuentaC(remove));

    toast.dismiss();

    toast.success("Cuenta Eliminada 🗑️");
  };

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
  } = useTable(cuentasContable, pageSize, filterState);

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
            title="Cuenta"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "cuenta"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("cuenta"),
        dataIndex: "cuenta",
        key: "cuenta",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: CuentasContable) => (
          <Text className="text-sm">{row.cuenta}</Text>
        ),
      },
      {
        title: <HeaderCell title="Tipo" />,
        dataIndex: "tipo",
        key: "tipo",
        minWidth: 100,
        flex: 1,
        render: (value: string) => <Text className="text-sm">{value}</Text>,
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
        title: <HeaderCell title="Actions" />,
        dataIndex: "action",
        key: "action",
        flex: 1,
        render: (_: string, row: CuentasContable) => (
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
            <Tooltip
              size="sm"
              content={"Eliminar Cuenta"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => deleteCuenta(row)}
              >
                <PiTrashDuotone className="h-4 w-4" />
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
    cuentasContable,
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
    edit,
  };
};
