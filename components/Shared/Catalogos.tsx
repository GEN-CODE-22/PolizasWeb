import { AppState, setServer } from "@/redux/slices/app";
import {
  GetCajaCuentas,
  GetCuentasContable,
  GetServidores,
  GetUnidadesOp,
} from "@/redux/slices/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Catalogos = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  useEffect(() => {
    dispatch(GetServidores());

    const serverSelect = window?.sessionStorage?.getItem("server");

    if (!!serverSelect) {
      dispatch(setServer(serverSelect));
    }
  }, []);

  useEffect(() => {
    if (server) {
      dispatch(GetCajaCuentas());
      dispatch(GetCuentasContable());
      dispatch(GetUnidadesOp());
    }
  }, [server]);

  return children;
};

export default Catalogos;
