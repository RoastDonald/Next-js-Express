import {
  SettingsApplications as SettingsApplicationsIcon,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
export const links = {
  public: true,
  items: [
    {
      title: "Account overview",
      link: "/my-account",
      icon: AccountCircleIcon,
    },
    {
      title: "My details",
      link: "/my-account/profile",
      icon: SettingsApplicationsIcon,
    },
    {
      title: "My cart",
      link: "/my-account/cart",
      icon: ShoppingBasketOutlined,
    },
    {
      isBtn: true,
      title: "Log out",
      link: "/login",
      icon: ExitToAppIcon,
    },
  ],
};
