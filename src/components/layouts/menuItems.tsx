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
  { label: "Home", icon: faHouse, key: "/" },
  { label: "Parts Supplier", icon: faDiagramProject, key: "/providers" },
  { label: "Daily", icon: faBook, key: "/providers/107" },
  { label: "Shop Utilities", icon: faMoneyBill, key: "/finances" },
  { label: "Users", icon: faUsers, key: "/users" },
  { label: "Logs", icon: faTty, key: "/logs" },
];
