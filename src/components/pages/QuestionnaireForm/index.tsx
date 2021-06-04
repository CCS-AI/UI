import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { styled } from '../../shared/Theme/theme';
import { Flex, TableCard } from '../../shared/form/StyledFormShared';
import { Questionnaire } from '../../../models/entities/questionnaire';
import QuestionnaireApi from '../../../sdk/controllers/questionnaire/questionnaire';
import { RootState } from '../../../state/store/store';
import { FormDropDown } from '../../shared/inputs/form';
import { DropDown } from '../../shared/inputs/base';
import CreateQuestnnaireForm from './components/QuestionnaireForm';

export type ShowQuestionnairesProps = {
    showLoader: boolean;
    //  questionnaires: Questionnaire[] | undefined;
    //fetchQuestionnaires: () => Promise<Questionnaire[]>;
    // getQuestionnaire: (questionnaireId: string) => Promise<Questionnaire>;
    //showLoader: boolean;
};

const ShowQuestionnaire = ({ showLoader }: ShowQuestionnairesProps) => {
    //const [questionnaires, setQuestionnaires] = useState<Questionnaire[] | undefined>();
    //const [questionnaire, setQuestionnaire] = useState<Questionnaire | undefined>();
    const [type, setType] = useState('');
    //setQuestionnaires(QuestionnaireApi.fetchAllQuestionnaires())
    // useEffect(() => {
    //     fetchQuestionnaires();
    // }, [fetchQuestionnaires]);

    console.log(type);
    return (
        <div>
            <FlexPageContainer>
                <DropDown
                    options={[
                        { value: 'id1', text: 'ABR אנמנזת תינוקות' },
                        { value: 'id2', text: 'אנמנזת ילדים' },
                        { value: 'id3', text: 'אנמנזת מבוגרים' }
                    ]}
                    placeHolder="בחירת סוג האנמנזה"
                    onChange={({ target }: React.ChangeEvent<{ value: any }>, child: React.ReactNode) => {
                        setType(target.value);
                    }}
                />
                <CreateQuestnnaireForm showLoader={showLoader} />
            </FlexPageContainer>
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.patient.createPatient
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestionnaire);
