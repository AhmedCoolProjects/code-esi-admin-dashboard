import { AppPathsDataProps } from "../../types";
import { MdGroups, MdLocalActivity } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";

export const APP_PATHS_DATA: AppPathsDataProps[] = [
  {
    title: "Persons",
    link: "/myapi/v1/admin/persons",
    icon: MdGroups,
    description: "Manage CODE Members",
  },
  {
    title: "Projects",
    link: "/myapi/v1/admin/projects",
    icon: FaProjectDiagram,
    description: "Manage CODE Projects",
  },
  {
    title: "Activities",
    link: "/myapi/v1/admin/activities",
    icon: MdLocalActivity,
    description: "Manage activities",
  },
];
