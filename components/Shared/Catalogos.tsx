"use client";

import { AppState, setServer } from "@/redux/slices/app";
import {
  GetCaja,
  GetCuentas,
  GetServidores,
  GetUnidades,
  setLoading,
} from "@/redux/slices/catalogos";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Catalogos = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const { server } = useSelector<StoreApp, AppState>((s) => s.app);

  useEffect(() => {
    dispatch(GetServidores());
  }, []);

  useEffect(() => {
    if (!!server) return;

    const serverSelect = window?.sessionStorage?.getItem("server");

    if (!server && !!serverSelect) {
      dispatch(setServer(serverSelect));
    }
  }, [server]);

  useEffect(() => {
    if (!!server) GetCatalogo();
  }, [server]);

  const GetCatalogo = async () => {
    dispatch(setLoading(true));
    const results = await Promise.all([
      dispatch(GetCuentas()).unwrap(),
      dispatch(GetUnidades()).unwrap(),
      dispatch(GetCaja()).unwrap(),
    ]);
    console.log({ results });
    dispatch(setLoading(false));
  };

  return children;
};

export default Catalogos;
