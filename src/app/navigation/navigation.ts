import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "orders",
        title: "Orders",
        type: "item",
        icon: "calendar",
        url: "/orders"
    },
    {
        id: "inventory",
        title: "Inventory",
        type: "item",
        icon: "calendar",
        url: "/inventory"
    },
    // {
    //     id: "taps",
    //     title: "Taps",
    //     type: "item",
    //     icon: "calendar",
    //     url: "/taps"
    // },
    {
        id: "store",
        title: "Store",
        type: "item",
        icon: "calendar",
        url: "/store"
    }
];
