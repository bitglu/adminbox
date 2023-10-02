import {
  faHouse,
  faChartSimple,
  faUsers,
  faDiagramProject,
  faMoneyBill,
  faTty,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

export const MENU_ITEMS_ADMIN_VM: any = [
  { label: "HOME", icon: faHouse, key: "/" },
  { label: "PARTS SUPPLIER", icon: faDiagramProject, key: "/providers" },
  { label: "DAILY", icon: faBook, key: "/providers/107" },
  { label: "SHOP UTILITIES", icon: faMoneyBill, key: "/finances" },
  { label: "USERS", icon: faUsers, key: "/users" },
  { label: "LOGS", icon: faTty, key: "/logs" },
];
