import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlexPageContainer } from '../../shared/styled/styled';
import { Flex, TableCard } from '../../shared/form/StyledFormShared';
import { Questionnaire, QuestionnaireResult, QuestionR } from '../../../models/entities/questionnaire';
import { dispatch, RootState } from '../../../state/store/store';
import { DropDown } from '../../shared/inputs/base';
import CreateQuestnnaireForm from './components/QuestionnaireForm';
import { questionnaireSelector } from '../../../state/ducks/questionnaire/selectors';

export type ShowQuestionnairesProps = {
    showLoader: boolean;
    questionnaireInfo?: Questionnaire;
    fetchAllQuestionnaires: () => Promise<Questionnaire[]>;
    setSingleQuestionnaire: () => void;
    getQuestionnaireById: (questionnaireId: string) => Promise<Questionnaire>;
    setQuestionnaireResInfo: React.Dispatch<React.SetStateAction<QuestionnaireResult | undefined>>;
};

// export const ShowQuestionnaire {{}} //for debug
const ShowQuestionnaire = ({
    showLoader,
    fetchAllQuestionnaires,
    getQuestionnaireById,
    questionnaireInfo,
    setSingleQuestionnaire,
    setQuestionnaireResInfo
}: ShowQuestionnairesProps) => {
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>();
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | undefined>();
    const [type, setType] = useState('');
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
                    options={
                        questionnaires?.map((q) => {
                            return {
                                value: q.id,
                                text: q.name
                            };
                        }) || []
                    }
                    placeHolder="בחירת סוג האנמנזה"
                    onChange={async ({ target }: React.ChangeEvent<{ value: any }>, child: React.ReactNode) => {
                        setSingleQuestionnaire();
                        setType(target.value);
                        getQuestionnaireById(target.value).then((r) => {
                            setQuestionnaire(r);
                        });
                    }}
                    value={type}
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
