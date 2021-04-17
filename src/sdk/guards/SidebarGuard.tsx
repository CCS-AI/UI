import { connect } from 'react-redux';
import React from 'react';
import { RootState } from '../../state/store/store';
import { withRouter } from 'react-router-dom';
import { userSelectors } from '../../state/ducks/user/selectors';

const SidebarGuard = ({ userRole, children }: any) => {
    return <React.Fragment>{React.cloneElement(children, { permission: userRole })}</React.Fragment>;
};

const mapStateToProps = (state: RootState) => ({
    userRole: userSelectors.userRole(state)
});
export default withRouter(connect(mapStateToProps, undefined)(SidebarGuard));
