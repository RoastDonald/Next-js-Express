import React from 'react'
import {
    SettingsApplications as SettingsApplicationsIcon,
    ShoppingBasketOutlined
} from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


export const linking = {
    items: [
      {
        title: "My account",
        link: "/my-account",
        icon: AccountCircleIcon,
      },
      {
        title: "User Information",
        link: "/my-account/profile",
        icon: SettingsApplicationsIcon,
      },
      {
        title: "My Cart",
        link: "/my-account/cart",
        icon: ShoppingBasketOutlined,
      },
      {
        title: "Sign Out",
        link: "/my-account",
        icon: AccountCircleIcon,
      },
    ],
    public: true,
  },