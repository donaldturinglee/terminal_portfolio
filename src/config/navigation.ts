export interface INavigationLink {
    name: string;
    description?: string;
    path: string;
}

export interface INavigation {
    links: INavigationLink[];
}

export const navigation: INavigation = {
    links: [
        { name: "Home", path: "/"},
        { name: "Projects", path: "/projects"},
        { name: "Services", path: "/services"},
        { name: "Profile", path: "/profile"}
    ],
};
