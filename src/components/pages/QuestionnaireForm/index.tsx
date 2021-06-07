import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { styled } from '../../shared/Theme/theme';
import { Flex, TableCard } from '../../shared/form/StyledFormShared';
import { Questionnaire, QuestionnaireResult, QuestionR } from '../../../models/entities/questionnaire';
import QuestionnaireApi from '../../../sdk/controllers/questionnaire/questionnaire';
import { dispatch, RootState } from '../../../state/store/store';
import { FormDropDown } from '../../shared/inputs/form';
import { DropDown } from '../../shared/inputs/base';
import CreateQuestnnaireForm from './components/QuestionnaireForm';
import { questionnaire } from '../../../state/ducks/questionnaire/questionnaire';
import { values } from 'lodash';
import { questionnaireSelector } from '../../../state/ducks/questionnaire/selectors';
import { Button } from '@material-ui/core';

const emptyQuestionnaires: Questionnaire[] = [];
export type ShowQuestionnairesProps = {
    showLoader: boolean;
    questionnaireInfo?: Questionnaire;
    fetchAllQuestionnaires: () => Promise<Questionnaire[]>;
    setSingleQuestionnaire: () => void;
    getQuestionnaireById: (questionnaireId: string) => Promise<Questionnaire>;
};

const emptyQuestionnaire = { id: '', name: '', questions: [] } as Questionnaire;

export const ShowQuestionnaire = ({
    showLoader,
    fetchAllQuestionnaires,
    getQuestionnaireById,
    questionnaireInfo,
    setSingleQuestionnaire
}: ShowQuestionnairesProps) => {
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>();
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | undefined>();
    const [type, setType] = useState('');
    const [questionnaireResInfo, setQuestionnaireResInfo] = useState<QuestionnaireResult | undefined>();
    const [disabledDropDown, setdisabledDropDown] = useState(false);
    useEffect(() => {
        setSingleQuestionnaire();
        fetchAllQuestionnaires().then((res) => {
            setQuestionnaires(res);
        });
    }, []);
    return (
        <div>
            <FlexPageContainer>
                <DropDown
                    options={[
                        { value: 'Q123', text: 'ABR אנמנזת תינוקות' },
                        { value: 'Q124', text: 'אנמנזת ילדים' },
                        { value: 'id3', text: 'אנמנזת מבוגרים' }
                    ]}
                    placeHolder="בחירת סוג האנמנזה"
                    onChange={async ({ target }: React.ChangeEvent<{ value: any }>, child: React.ReactNode) => {
                        setType(target.value);
                        getQuestionnaireById(target.value).then((r) => {
                            setQuestionnaire(r);
                        });
                    }}
                    disabled={disabledDropDown}
                />
            </FlexPageContainer>

            {questionnaireInfo && questionnaireInfo.questions && questionnaireInfo.questions.length ? (
                <Flex>
                    <CreateQuestnnaireForm
                        showLoader={showLoader}
                        questionnaire={questionnaireInfo}
                        setQuestionnaireResInfo={setQuestionnaireResInfo}
                        setdisabledDropDown={setdisabledDropDown}
                    />
                </Flex>
            ) : (
                <div>No questionnaire</div>
            )}
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    questionnaireInfo: questionnaireSelector.questionnaireInfo(state),
    showLoader: state.loading.effects.patient.createPatient
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchAllQuestionnaires: () => dispatch.questionnaire.fetchAllQuestionnaires(),
    getQuestionnaireById: (questionnaireId: string) => dispatch.questionnaire.getQuestionnaireById(questionnaireId),
    setSingleQuestionnaire: () => dispatch.questionnaire.setSingleQuestionnaire()
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestionnaire);
