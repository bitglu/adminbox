import {
  faHouse,
  faChartSimple,
  faUsers,
  faDiagramProject,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

export const MENU_ITEMS_ADMIN_VM: any = [
  { label: "Home", icon: faHouse, key: "/" },
  { label: "Providers", icon: faDiagramProject, key: "/providers" },
  { label: "Finances", icon: faMoneyBill, key: "/finances" },
  { label: "Users", icon: faUsers, key: "/users" },
];
