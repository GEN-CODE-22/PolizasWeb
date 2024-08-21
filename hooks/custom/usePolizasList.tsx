import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useRouter } from "next/router";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from "rizzui";
import {
  PiCaretCircleRightBold,
  PiEyeDuotone,
  PiFileXls,
  PiXCircleBold,
} from "react-icons/pi";
import {
  GetPolizas,
  PolizasState,
  setFiltros,
  setPoliza,
  setTipoPoliza,
} from "@/redux/slices/polizas";
import { Poliza } from "@/interfaces/Poliza";
import { DateCell } from "@/components/ui/date-cell";
import { AppState } from "@/redux/slices/app";
import { exportToExcel } from "@/helpers/excel";
import moment from "moment";

// get status badge
function getStatusBadge(status: string) {
  switch (status) {
    case "C":
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-green-dark">
            Facturas Canceladas
          </Text>
        </div>
      );
    case "V":
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-green-dark">Ventas</Text>
        </div>
      );
    case "L":
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-green-dark">Cobranza</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

// get status badge
function getStatus(status: string) {
  switch (status) {
    case "C":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Cancelada</Text>
        </div>
      );
    case "P":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pendiente</Text>
        </div>
      );
    case "L":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Posteada</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

const filterState = {
  id: 0,
  descripcion: "",
  cve_unidad: "",
};

interface Detalle {
  id: number;
  poliza: string;
  origen: string;
  cuenta: string;
  unidad: string;
  journal_id: string;
  departamento: string;
  referencia: string;
  descripcion: string;
  importe: number;
  createBy: string;
  producto: string;
  createAt: Date;
}
export const usePolizasList = (tipo: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);

  const { polizas, loading, FechaFin, FechaInicio, tipoP } = useSelector<
    StoreApp,
    PolizasState
  >((s) => s.polizas);

  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  const setTipo = () => {
    dispatch(setTipoPoliza(tipo));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!!FechaFin && !!FechaInicio) {
        setTipo();
        GetData();
      }
    }, 4000); // Ajusta el tiempo de debounce según sea necesario
    return () => {
      clearTimeout(handler);
    };
  }, [FechaFin, FechaInicio]);

  useEffect(() => {
    setTipo();
  }, [tipo]);

  useEffect(() => {
    if (!!server) {
      dispatch(setFiltros({ FechaFin: undefined, FechaInicio: undefined }));
      setTipo();
      GetData();
    }
  }, [server]);

  const GetData = () => dispatch(GetPolizas());

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
    router.push(`/poliza/edit/${row.id}`);
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
  } = useTable(polizas, pageSize, filterState);

  const onChange = (row: Poliza) => {
    console.log(row);
  };

  const descargar = (row: Poliza) => {
    let tipo =
      row.tipo === "V"
        ? "Ventas"
        : row.tipo === "C"
          ? "Canceladas"
          : row.tipo === "L"
            ? "Cobranza"
            : "Sepa";

    let datos: Detalle[] = [
      ...row.detalles.map((d) => {
        let de: Detalle = {
          id: d.id,
          poliza: tipo,
          origen: d.origen,
          cuenta: d.cuenta.cuenta,
          unidad: d.unidad.cve_unidad,
          journal_id: d.journal_id,
          departamento: d.departamento,
          referencia: d.referencia,
          descripcion: d.descripcion,
          importe: d.importe,
          createBy: d.createBy,
          producto: "",
          createAt: d.createAt,
        };
        return de;
      }),
    ];

    exportToExcel(
      datos,
      `Poliza-${tipo}-${moment(row.createAt).format("yyyy-mm-dd")}`
    );
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
        render: (_: string, row: Poliza) => (
          <Text className="text-sm">{row.id}</Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Tipo"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "tipo"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("tipo"),
        dataIndex: "tipo",
        key: "tipo",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Poliza) => getStatusBadge(row.tipo),
      },
      {
        title: (
          <HeaderCell
            title="Estatus"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "estatus"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("estatus"),
        dataIndex: "estatus",
        key: "estatus",
        minWidth: 100,
        flex: 1,
        render: (_: string, row: Poliza) => getStatus(row.estatus),
      },

      {
        title: (
          <HeaderCell
            title="Fecha"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "createAt"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("createAt"),
        dataIndex: "createAt",
        key: "createAt",
        minWidth: 100,
        flex: 1,
        render: (value: any) => (
          <DateCell date={value} dateFormat="yyyy-MM-DD" />
        ),
      },
      // {
      //   title: (
      //     <HeaderCell
      //       title="Revisada"
      //       sortable
      //       ascending={
      //         sortConfig?.direction === "asc" && sortConfig?.key === "check"
      //       }
      //     />
      //   ),
      //   onHeaderCell: () => onHeaderCellClick("check"),
      //   dataIndex: "check",
      //   key: "check",
      //   minWidth: 100,
      //   flex: 1,
      //   render: (_: any, row: Poliza) => (
      //     <Checkbox
      //       value={row.check}
      //       onChange={(e) =>
      //         onChange({ ...row, check: e.target.checked ? 1 : 0 })
      //       }
      //     />
      //   ),
      // },

      {
        title: <HeaderCell title="Actions" />,
        dataIndex: "action",
        key: "action",
        flex: 1,
        render: (_: string, row: Poliza) => (
          <div className="flex items-center gap-3 pe-4">
            <Tooltip
              size="sm"
              content={"Ver Detalle"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => onEdit(row)}
              >
                <PiEyeDuotone className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              size="sm"
              content={"Descargar"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => descargar(row)}
              >
                <PiFileXls className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            {row.estatus === "P" && (
              <Tooltip
                size="sm"
                content={"Postear"}
                placement="top"
                color="invert"
              >
                <ActionIcon
                  size="sm"
                  variant="outline"
                  // onClick={() => onEdit(row)}
                >
                  <PiCaretCircleRightBold className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
            )}
            {row.estatus === "P" && (
              <Tooltip
                size="sm"
                content={"Cancelar"}
                placement="top"
                color="invert"
              >
                <ActionIcon
                  size="sm"
                  variant="outline"
                  // onClick={() => onEdit(row)}
                >
                  <PiXCircleBold className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
            )}
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
    polizas,
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
