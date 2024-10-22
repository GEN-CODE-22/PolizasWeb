import { IconType } from "react-icons/lib";
import {
  PiAirplaneTiltDuotone,
  PiAppStoreLogoDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCardsDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChatCenteredDotsDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFileImageDuotone,
  PiFolderLockDuotone,
  // PiFolderNotchDuotone,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMagicWandDuotone,
  PiMapPinLineDuotone,
  PiNoteBlankDuotone,
  PiNotePencilDuotone,
  PiPackageDuotone,
  PiPokerChipDuotone,
  PiRocketLaunchDuotone,
  PiShieldCheckeredDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSquaresFourDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiInvoiceDuotone,
  PiStackThin,
} from "react-icons/pi";
import { atom } from "jotai";
import { routes } from "@/components/config/routes";
import { DUMMY_ID } from "@/components/config/constants";

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const carbonMenuItems: MenuItemsType[] = [
  {
    id: "1",
    name: "Catalogos",
    title: "Overview",
    icon: PiBrowserDuotone,
    menuItems: [
      {
        name: "Cuentas Contable",
        href: "/catalogo/cuentas-contable",
        icon: PiCalendarDuotone,
      },
      {
        name: "Bancos Planta",
        href: "/catalogo/bancos",
        icon: PiCalendarDuotone,
      },
      {
        name: "Unidades Operativa",
        href: "/catalogo/unidades",
        icon: PiBriefcaseDuotone,
      },
    ],
  },
  {
    id: "2",
    name: "Polizas",
    title: "Apps Kit",
    icon: PiAppStoreLogoDuotone,
    menuItems: [
      {
        name: "Poliza Ventas",
        description: "",
        href: "/poliza/ventas",
        icon: PiInvoiceDuotone,
      },
      {
        name: "Polizas",
        description: "",
        href: "/poliza/all",
        icon: PiInvoiceDuotone,
      },
      {
        name: "Poliza Canceladas",
        description: "",
        href: "/poliza/canceladas",
        icon: PiInvoiceDuotone,
      },
      {
        name: "Poliza Cobranza",
        description: "",
        href: "/poliza/cobranza",
        icon: PiInvoiceDuotone,
      },
      {
        name: "Crear Poliza",
        description: "",
        href: "/poliza/create",
        icon: PiStackThin,
      },
    ],
  },
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
