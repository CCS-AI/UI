import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getPermissions, Permission } from '../../../models/entities/Permissions';
import { RootState } from '../../../state/store/store';
import { userSelectors } from '../../../state/ducks/user/selectors';
import { styled } from '../Theme/theme';

const UserGuard = ({ userRole, children, location }: any) => {
    const hasPermission = (permission: number, path: string) => getPermissions()[permission].includes(path);

    if (!hasPermission(userRole, location.pathname))
        return (
            <NoRoleContainer>
                <span className="material-icons">error</span>
                <span>אין לך הרשאות צפייה בדף זה</span>
            </NoRoleContainer>
        );
    return <React.Fragment>{children}</React.Fragment>;
};
const NoRoleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    .material-icons {
        font-size: inherit;
    }
`;
const mapStateToProps = (state: RootState) => ({
    userRole: userSelectors.userRole(state)
});
export default withRouter(connect(mapStateToProps, undefined)(UserGuard));

export const permissionFromString = (text: string) => {
    if (Permission[text] !== undefined) return Permission[text];
    return Permission.UNDEFINED;
};
