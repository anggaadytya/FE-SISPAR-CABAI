import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

export const SideBarData = [
  {
    id: 1,
    icon: UilEstate,
    heading: "Dahboard",
    link: "/admin/dashboard",
  },
  {
    id: 2,
    icon: UilClipboardAlt,
    heading: "Gejala",
    link: "/admin/gejala",
  },
  {
    id: 3,
    icon: UilChart,
    heading: "Hama Penyakit",
    link: "/admin/hamapenyakit",
  },
  {
    id: 4,
    icon: UilPackage,
    heading: "Basis Kasus",
    link: "/admin/basiskasus",
  },
  {
    id: 5,
    icon: UilUsersAlt,
    heading: "Report",
    link: "/admin/report",
  },
];
