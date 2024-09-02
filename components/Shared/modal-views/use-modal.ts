"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { ModalSize } from "rizzui";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  size?: ModalSize;
  title?: string;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "320px",
  size: "sm",
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    size,
    title,
  }: {
    view: React.ReactNode;
    customSize?: string;
    size?: ModalSize;
    title?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      size,
      title,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
