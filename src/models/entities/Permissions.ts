import { PagesRoutes } from '../../routing/PagesRoutes';

export const getPermissions = () => {
    let permissions: { [role: number]: string[] } = {};
    permissions[Permission.ADMIN] = Object.values(PagesRoutes);
    permissions[Permission.UNDEFINED] = [];
    permissions[Permission.Examiner] = Object.values(PagesRoutes).filter((url) => url != PagesRoutes.RegisterExaminer);
    permissions[Permission.OrganizationManager] = Object.values(PagesRoutes);
    return permissions;
};

export enum Permission {
    Examiner,
    OrganizationManager,
    ADMIN,
    UNDEFINED
}
