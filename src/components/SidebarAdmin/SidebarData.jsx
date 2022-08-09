export const SidebarData = [
    {
        title: "Inmuebles",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Mis inmuebles",
                path: "/admin/inmuebles",
                icon: null,
                cName: "sub-nav",
            },
            {
                title: "registrar inmueble",
                path: "/admin/nuevo-inmueble",
                icon: null,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Contactos",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Contactame",
                path: "/admin/to-contact",
                icon: null,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Config",
        path: "#",
        icon: null,
        iconClosed: null,
        iconOpened: null,

        subNav: [
            {
                title: "Usuarios",
                path: "/admin/users",
                icon: null,
                onlyAdmin: true,
            },
        ],
    },
];
