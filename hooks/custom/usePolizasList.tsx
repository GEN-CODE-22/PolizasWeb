import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useColumn } from "../use-column";
import { useRouter } from "next/router";
import { useTable } from "../use-table";
import { HeaderCell } from "@/components/ui/TableV2";
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from "rizzui";
import {
  PiEyeDuotone,
  PiFileXls,
  PiMoney,
  PiXCircleBold,
} from "react-icons/pi";
import {
  checkedAll,
  CheckedPoliza,
  GetPolizas,
  PolizasState,
  PostedPoliza,
  RecoveryPostedPoliza,
  setFiltros,
  setPoliza,
  setTipoPoliza,
} from "@/redux/slices/polizas";
import { Poliza } from "@/interfaces/Poliza";
import { DateCell } from "@/components/ui/date-cell";
import { AppState } from "@/redux/slices/app";
import { exportToExcel } from "@/helpers/excel";
import moment from "moment";
import { useModal } from "@/components/Shared/modal-views/use-modal";
import { DetallePoliza } from "@/components/content/polizas/DetallePoliza";
import { convertMoney } from "@/utils/tools";
import { TDocXLS } from "@/interfaces";
import toast from "react-hot-toast";

interface DataType {
  key: number;
  name: string;
  date: Date;
}
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
    case "T":
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium text-secondary">Revisada</Text>
        </div>
      );
    case "M":
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-amber-500">Proceso PS</Text>
        </div>
      );
    case "G":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-900">
            Generada en PS
          </Text>
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
export const usePolizasList = (tipo?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(31);

  const { polizas, loading } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  const { closeModal, openModal } = useModal();

  const setTipo = () => {
    dispatch(setTipoPoliza(tipo));
  };

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (!!FechaFin && !!FechaInicio) {
  //       setTipo();
  //       GetDataPolizas();
  //     }
  //   }, 4000); // Ajusta el tiempo de debounce según sea necesario
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [FechaFin, FechaInicio]);

  useEffect(() => {
    setTipo();
  }, [tipo]);

  useEffect(() => {
    if (!!server) {
      dispatch(setFiltros({ FechaFin: undefined, FechaInicio: undefined }));
      setTipo();
      GetDataPolizas();
    }
  }, [server]);

  const GetDataPolizas = () => dispatch(GetPolizas());

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

  const onPostearPolizas = async () => {
    await toast.promise(dispatch(PostedPoliza()).unwrap(), {
      error: "Error la mandar a ps ",
      loading: "Enviando Polizas a PS",
      success: "Polizas Enviadas",
    });
  };

  const checked = () => {
    dispatch(checkedAll());
  };

  const isPendienteRecuperar = polizas.filter(
    (p) => p.estatus === "M" && p.check === 1
  );

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
    dispatch(CheckedPoliza(row));
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
      // Estatus
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
      // Fecha
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
      //
      {
        title: (
          <HeaderCell
            title="Cuadrada"
            sortable
            ascending={
              sortConfig?.direction === "asc" && sortConfig?.key === "check"
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick("check"),
        dataIndex: "check",
        key: "check",
        minWidth: 100,
        flex: 1,
        render: (value: number, row: Poliza) => {
          var importe = row.detalles?.reduce((t, i) => t + i.importe, 0);

          // Redondea el valor para evitar problemas de precisión
          const precision = 4; // Número de decimales que quieres mantener
          importe = parseFloat(importe.toFixed(precision));

          let cuadra = importe === 0;

          return (
            <Checkbox
              checked={value === 1}
              disabled={!cuadra || row.estatus === "G"}
              value={value}
              label={
                <span
                  className={`flex items-center gap-1 ${cuadra ? "#064F1CFF " : "#BA0B0BFF"}`}
                >
                  {convertMoney(importe === -0 ? 0 : importe)}
                  <PiMoney
                    className="h-4 w-4 "
                    color={cuadra ? "#064F1CFF " : "#BA0B0BFF"}
                  />
                </span>
              }
              onChange={(e) =>
                onChange({
                  ...row,
                  check: e.target.checked ? 1 : 0,
                  estatus: e.target.checked ? "T" : "P",
                })
              }
            />
          );
        },
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
              content={"Ver Detalle"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => handleCreateModal(row)}
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
            {/* {row.estatus === "T" && (
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
            )} */}
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

  function handleCreateModal(row: Poliza) {
    dispatch(setPoliza(row));
    closeModal(),
      openModal({
        view: <DetallePoliza />,
        size: "full",
        title: "Detalle Poliza",
      });
  }

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  const dataExcel = [
    ...polizas.map((p, i) => {
      let datos: Detalle[] = [
        ...p.detalles.map((d) => {
          let de: Detalle = {
            id: d.id,
            poliza: p?.tipo ?? "A",
            origen: d?.origen,
            cuenta: d.cuenta?.cuenta ?? "N/A",
            unidad: d.unidad?.cve_unidad ?? "N/A",
            journal_id: d?.journal_id,
            departamento: d?.departamento,
            referencia: d?.referencia,
            descripcion: d?.descripcion,
            importe: d?.importe,
            createBy: d?.createBy,
            producto: "",
            createAt: d?.createAt,
          };
          return de;
        }),
      ];
      return {
        dataSheet: datos,
        nameFile: "",
        nameSheet:
          tipo === "V"
            ? `PolizaVentas-${moment(p.createAt).format("YYYY-MM-DD")}`
            : tipo === "L"
              ? `PolizaCobranza-${moment(p.createAt).format("YYYY-MM-DD")}`
              : `PolizaCanceladas-${moment(p.createAt).format("YYYY-MM-DD")}`,
      };
    }),
  ];

  let isPendingPostPS =
    polizas.filter((p) => p?.check === 1 && p.estatus === "T").length > 0;

  const RecuperarFolios = () => {
    dispatch(RecoveryPostedPoliza());
  };

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
    dataExcel,
    onPostearPolizas,
    isPendingPostPS,
    GetDataPolizas,
    checked,
    isPendienteRecuperar,
    RecuperarFolios,
  };
};
