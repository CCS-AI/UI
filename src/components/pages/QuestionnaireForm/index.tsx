import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { styled } from '../../shared/Theme/theme';
import { Flex, TableCard } from '../../shared/form/StyledFormShared';
import { Questionnaire, QuestionnaireResult, QuestionR } from '../../../models/entities/questionnaire';
import QuestionnaireApi from '../../../sdk/controllers/questionnaire/questionnaire';
import { RootState } from '../../../state/store/store';
import { FormDropDown } from '../../shared/inputs/form';
import { DropDown } from '../../shared/inputs/base';
import CreateQuestnnaireForm from './components/QuestionnaireForm';

export type ShowQuestionnairesProps = {
    showLoader: boolean;
    questionnaires: Questionnaire[] | undefined;
    //setQuestionnaireResInfo:React.Dispatch<React.SetStateAction<questionR | undefined>>
    //fetchQuestionnaires: () => Promise<Questionnaire[]>;
    // getQuestionnaire: (questionnaireId: string) => Promise<Questionnaire>;
    //showLoader: boolean;
};

export const initQ = {
    id: 'Q123',
    name: 'אנמנזההה',
    questions: [
        {
            id: '123',
            name: 'האם חלית בקורונה',
            questionnaireId: 'Q123',
            answers: [
                { id: '2313', name: 'כן', questionId: '123' },
                { id: '2314', name: 'לא', questionId: '123' },
                { id: '2315', name: 'אולי', questionId: '123' }
            ]
        },
        {
            id: '124',
            name: '2האם חלית בקורונה',
            questionnaireId: 'Q123',
            answers: [
                { id: '2316', name: 'כן1', questionId: '124' },
                { id: '2317', name: '1לא', questionId: '124' },
                { id: '2318', name: '1אולי', questionId: '124' }
            ]
        }
    ]
} as Questionnaire;

const ShowQuestionnaire = ({ showLoader }: ShowQuestionnairesProps) => {
    //const [questionnaires, setQuestionnaires] = useState<Questionnaire[] | undefined>();
    //const [questionnaire, setQuestionnaire] = useState<Questionnaire | undefined>();
    const [type, setType] = useState('');
    const [questionnaireResInfo, setQuestionnaireResInfo] = useState<QuestionnaireResult | undefined>();
    //setQuestionnaires(QuestionnaireApi.fetchAllQuestionnaires())
    // useEffect(() => {
    //     fetchQuestionnaires();
    // }, [fetchQuestionnaires]);

    console.log('qr ', questionnaireResInfo);
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
                <CreateQuestnnaireForm showLoader={showLoader} questionnaire={initQ} setQuestionnaireResInfo={setQuestionnaireResInfo} />
            </FlexPageContainer>
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.patient.createPatient
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestionnaire);
