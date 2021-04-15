import { connect } from 'react-redux';
import React from 'react';
import { RootState } from '../../state/store/store';
import { withRouter } from 'react-router-dom';
import { userSelectors } from '../../state/ducks/user/selectors';
import { getPermissions, Permission } from '../../models/entities/Permissions';

const UserGuard = ({ userRole, children, location }: any) => {
    const hasPermission = (permission: Permission, path: string) => getPermissions()[permission].includes(path);

    if (!hasPermission(userRole, location.pathname)) return <div>Role error</div>;
    return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state: RootState) => ({
    userRole: userSelectors.userRole(state)
});
export default withRouter(connect(mapStateToProps, undefined)(UserGuard));

export const permissionFromString = (text: string) => {
    if (Permission[text as any]) return Permission[text as any];
    return Permission.UNDEFINED;
};
