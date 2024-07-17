import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useRouter } from "next/router";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Text, Tooltip } from "rizzui";
import { PiNotePencil } from "react-icons/pi";
import { PolizasState, setPoliza } from "@/redux/slices/polizas";
import { Detalle, Poliza } from "@/interfaces/Poliza";
import { DateCell } from "@/components/ui/date-cell";
import { convertMoney } from "@/utils/tools";

const filterState = {
  id: 0,
  descripcion: "",
  cve_unidad: "",
};

export const usePoliza = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(20);

  const { currentPoliza, loading } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(async (id: string) => {
    handleDelete(id);
  }, []);

  const onEdit = (row: Poliza) => {
    dispatch(setPoliza(row));
  };

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
  } = useTable(currentPoliza?.detalles ?? [], pageSize, filterState);

  const columns = useMemo(
    () => [
      // {
      //   title: (
      //     <HeaderCell
      //       title="Id"
      //       sortable
      //       ascending={
      //         sortConfig?.direction === "asc" && sortConfig?.key === "id"
      //       }
      //     />
      //   ),
      //   onHeaderCell: () => onHeaderCellClick("id"),
      //   dataIndex: "id",
      //   key: "id",
      //   minWidth: 30,
      //   flex: 1,
      //   render: (_: string, row: Poliza) => (
      //     <Text className="text-sm">{row.id}</Text>
      //   ),
      // },
      {
        title: <HeaderCell title="PS-Folio" />,
        dataIndex: "journal_id",
        key: "journal_id",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.journal_id}</Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Origen"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "origen"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("origen"),
        dataIndex: "origen",
        key: "origen",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.origen}</Text>
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
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.cuenta?.cuenta}</Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Unidad"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "unidad"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("unidad"),
        dataIndex: "unidad",
        key: "unidad",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.unidad?.cve_unidad}</Text>
        ),
      },
      {
        title: <HeaderCell title="Departamento" />,
        dataIndex: "departamento",
        key: "departamento",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.departamento}</Text>
        ),
      },

      // {
      //   title: <HeaderCell title="Referencia" />,
      //   dataIndex: "referencia",
      //   key: "referencia",
      //   minWidth: 100,
      //   flex: 1,
      //   render: (_: string, row: Detalle) => (
      //     <Text className="text-sm">{row?.referencia}</Text>
      //   ),
      // },
      {
        title: <HeaderCell title="Importe" />,
        dataIndex: "importe",
        key: "importe",
        width: 100,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm" style={{ textAlign: "right" }}>
            {convertMoney(row?.importe ?? 0)}
          </Text>
        ),
      },
      {
        title: <HeaderCell title="Descripcion" />,
        dataIndex: "descripcion",
        key: "descripcion",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Detalle) => (
          <Text className="text-sm">{row?.descripcion}</Text>
        ),
      },
      {
        title: <HeaderCell title="Fecha" />,
        dataIndex: "createAt",
        key: "createAt",
        minWidth: 100,
        flex: 1,
        render: (value: any) => (
          <DateCell date={value} dateFormat="yyyy-MM-DD hh:mm" />
        ),
      },

      {
        title: <HeaderCell title="Actions" />,
        dataIndex: "action",
        key: "action",
        flex: 1,
        render: (_: string, row: Poliza) => (
          <div className="flex items-center gap-3 pe-4">
            <Tooltip
              size="sm"
              content={"Editar"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => onEdit(row)}
              >
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
    data: currentPoliza?.detalles ?? [],
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
