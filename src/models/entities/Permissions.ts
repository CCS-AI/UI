import { PagesRoutes } from '../../routing/PagesRoutes';
import { SIDEBAR_CATEGORIES, SIDEBAR_HEADERS } from '../../components/shared/Layout/SideBar_/SideBar';

export const getPermissions = () => {
    let permissions: { [role: number]: string[] } = {};
    permissions[Permission.ADMIN] = Object.values(PagesRoutes);
    permissions[Permission.UNDEFINED] = [];
    permissions[Permission.Examiner] = Object.values(PagesRoutes).filter((url) => url != PagesRoutes.RegisterExaminer);
    permissions[Permission.OrganizationManager] = Object.values(PagesRoutes);
    return permissions;
};

export const getSidebarCategoriesPermissions = () => {
    let permissions: { [role: number]: string[] } = {};
    permissions[Permission.ADMIN] = SIDEBAR_CATEGORIES;
    permissions[Permission.UNDEFINED] = [];
    permissions[Permission.Examiner] = SIDEBAR_CATEGORIES.filter((cat) => cat !== 'פעולות על מטפלים');
    permissions[Permission.OrganizationManager] = SIDEBAR_CATEGORIES;
    return permissions;
};

export const getSidebarHeadersPermissions = () => {
    let permissions: { [role: number]: string[] } = {};
    permissions[Permission.ADMIN] = SIDEBAR_HEADERS;
    permissions[Permission.UNDEFINED] = [];
    permissions[Permission.Examiner] = SIDEBAR_HEADERS.filter((cat) => cat !== 'מטפלים');
    permissions[Permission.OrganizationManager] = SIDEBAR_HEADERS;
    return permissions;
};

export const hasPermissionToCategory = (permission: Permission, category: string) => {
    if (!SIDEBAR_CATEGORIES.includes(category)) throw new Error(`Un know ${category} , Did you forget to add this category to SIDEBAR_CATEGORIES ? `);
    return !getSidebarCategoriesPermissions()[permission].includes(category);
};

export const hasPermissionToHeader = (permission: Permission, header: string) => {
    if (!SIDEBAR_HEADERS.includes(header)) throw new Error(`Un know ${header} , Did you forget to add this header to SIDEBAR_HEADER ? `);
    return !getSidebarHeadersPermissions()[permission].includes(header);
};

export enum Permission {
    Examiner,
    OrganizationManager,
    ADMIN,
    UNDEFINED
}
