import React from 'react';
import { RootState } from '../../../state/store/store';
import CreatePatientForm from './components/CreatePatientForm';
import { connect } from 'react-redux';
import { styled } from '../../shared/Theme/theme';
import { PagesRoutes } from '../../../routing/PagesRoutes';
import { Link, match } from 'react-router-dom';

type Props = {
    showLoader: boolean;
    error: string;
    login: (username: string, password: string, recaptchaToken?: string) => void;
    match: match;
};

const CreatePatientPage = ({ showLoader, error, login, match }: Props) => {
    return (
        <div>
            <CreatePatientForm
                showLoader={showLoader}
                error={error}
                login={login}
                match={match}
                /** here send props you need */
            />
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    //here get variables from store and set them to this component 'Props'
});

const mapDispatchToProps = (dispatch: any) => ({
    //here get functions from effects and set them to this component 'Props'
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientPage);
