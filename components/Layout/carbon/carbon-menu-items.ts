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
        href: "#",
        icon: PiShoppingCartDuotone,
        subMenuItems: [
          {
            name: "Lista de Polizas",
            href: "/poliza/list",
            badge: "",
          },
          {
            name: "Poliza Detalles",
            href: "/poliza/details",
            badge: "",
          },
          {
            name: "Crear Poliza",
            href: routes.eCommerce.createProduct,
          },
          {
            name: "Editar Poliza",
            href: routes.eCommerce.ediProduct(DUMMY_ID),
          },
        ],
      },
    ],
  },
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
