import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';
import { SelectPointType } from './PointType';
import { earTypes, examPointTypes, ExamPointTypes, getBaseType, pointToImage, pointTypeToStyle } from '../../../models/entities/examPointTypes';
import { SpeechAudiometryDetails } from '../../pages/SpeechAudiometry/index';
import { speechAudiometry } from '../../../models/entities/SP';
import { TextBox } from './TextBox';
import Button from '@material-ui/core/Button';
import { QuestionnaireResult } from '../../../models/entities/questionnaire';
import { Examination } from '../../../models/entities/examination';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RoundedButton } from '../../shared/form/StyledFormShared';
import { BtnLoader } from '../../shared/SmallComponents/Loader';
import SaveIcon from '@material-ui/icons/Save';

type Props = {
    data: Data[];
    width: number;
    height: number;
};
export type Data = {
    x: number;
    y: number;
    ear: 'RIGHT' | 'LEFT';
    type: ExamPointTypes;
    isNoResponse: boolean;
};

type CreateExaminationProps = RouteComponentProps<{ pmfId: string }> & {
    questionnaireResults?: QuestionnaireResult;
    postExamination: (examination: Examination, patientId: string) => Promise<any>;
    pmfid?: string;
    patientId: string;
    submitCallback?: () => void;
};

const normalizeX = (realX: number, xMargin: number) => {
    const indexInXvalues = xAxisPoints.indexOf(realX);
    return xMargin + xMargin * indexInXvalues;
};

const unNormalizeX = (normalizeX: number, xMargin: number) => {
    const indexInXvalues = normalizeX / xMargin - 1;
    return xAxisPoints[indexInXvalues];
};

export const roundXpoint = (x: number, width: number) => {
    if (x < xAxisPoints[0]) throw new Error(`Lower bound is ${xAxisPoints[0]}`);
    let minDist = width; // bigger then any dist, must be 22000+.
    let roundedX = -1;

    // find closet x in X-Axis
    xAxisPoints.forEach((curX) => {
        let dist = Math.abs(curX - x);
        if (dist < minDist) {
            roundedX = curX;
            minDist = dist;
        }
    });
    return roundedX;
};

export const normalizePoint = (point: Data, xMargin: number, width: number) => {
    const newPoint = { ...point };
    newPoint.x = normalizeX(roundXpoint(newPoint.x, width), xMargin);
    return newPoint;
};

export const xAxisPoints = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
export const invisiblePoints = [750, 1500, 3000, 6000];
export const yAxisPoints = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

const CreateExamination = ({ questionnaireResults, postExamination, match, pmfid, submitCallback, patientId }: CreateExaminationProps) => {
    const [data, setData] = useState<Data[]>([]);
    const [spInfo, setSpInfo] = useState<speechAudiometry | undefined>(undefined);
    const [pBackground, setPbackground] = useState<string>('');
    const [showLoader, setLoader] = useState(false);

    const addData = (point: Data) => {
        setData(data.concat(point));
    };

    const callCreateExamination = () => {
        setLoader(true);
        const medicalFileId = pmfid ? pmfid : match.params.pmfId;
        const exmaination: Examination = {
            pmfId: medicalFileId,
            info: data,
            speechAudiometry: spInfo as speechAudiometry,
            summary: pBackground,
            questionnaireResults: questionnaireResults
        } as Examination;
        postExamination(exmaination, patientId)
            .then((res) => {})
            .finally(() => {
                setLoader(false);
            });

        if (submitCallback) submitCallback();
    };

    return (
        <div>
            <div className={'point-type-container'}>
                <SelectPointType addData={addData} />
                <Exam data={data} width={1000} height={800} />
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%', marginLeft: '30px' }}>
                    <SpeechAudiometryDetails setSpInfo={setSpInfo} />
                </div>
                <div
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%'
                    }}
                >
                    <h3>רקע מטופל</h3>
                    <TextBox initVal={pBackground} width="100%" rows={19} valueChange={setPbackground} />
                </div>
            </div>
            <div
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0'
                }}
            >
                <RoundedButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={callCreateExamination}
                    disabled={!data.length || !pBackground}
                >
                    {showLoader ? <BtnLoader /> : <span>{'שמירה'}</span>}
                </RoundedButton>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    postExamination: (examination: Examination, patientId: string) => dispatch.examination.postExamination({ examination, patientId })
});

export default withRouter(connect(null, mapDispatchToProps)(CreateExamination));

const Exam = ({ data, width, height }: Props) => {
    const [dataPoints, setDataPoints] = useState<Data[]>([]);

    useEffect(() => {
        setDataPoints(data);
    }, [data]);

    const xMargin = 8000 / xAxisPoints.length;
    const dataByTypes = () => {
        let result: { [type: string]: { LEFT: Data[]; RIGHT: Data[] } } = {};
        examPointTypes.forEach((value) => {
            result[value] = { RIGHT: [], LEFT: [] };
            earTypes.forEach((ear) => {
                const array = dataPoints.filter((point) => point.type == value && point.ear == ear);
                const earType = ear as 'RIGHT' | 'LEFT';
                result[value][earType] = array != null ? array : [];
            });
        });

        return result;
    };

    const basePointsToAppendToDevLine = (base: Data[], developed: Data[], lastPoint: Data) => {
        return previousPointInBase(base, developed, lastPoint).concat(afterPointInBase(base, developed, lastPoint));
    };

    const previousPointInBase = (base: Data[], developed: Data[], curDevPoint: Data) => {
        const preInBase = base.filter((p) => p.x < curDevPoint.x);
        const devX = developed.map((p) => p.x);
        const preInBaseAndNotInDev = preInBase.filter((p) => !devX.includes(p.x));
        return preInBaseAndNotInDev;
    };

    const afterPointInBase = (base: Data[], developed: Data[], curDevPoint: Data) => {
        const preInBase = base.filter((p) => p.x > curDevPoint.x);
        const devX = developed.map((p) => p.x);
        const preInBaseAndNotInDev = preInBase.filter((p) => !devX.includes(p.x));
        return preInBaseAndNotInDev;
    };

    const getPointsInLine = (data: { [p: string]: { LEFT: Data[]; RIGHT: Data[] } }, type: ExamPointTypes, ear: 'RIGHT' | 'LEFT') => {
        if (getBaseType(type, ear) == 'None') {
            // Filter only with the same type & ear.
            return data[type][ear];
        } else {
            console.log('Detect a developed type!');
            const baseType = getBaseType(type, ear) as ExamPointTypes;
            const developedPoints = data[type][ear];
            const basePoints = data[baseType][ear];
            const devXpoints = developedPoints.map((p) => p.x);
            const maxPointInDev = developedPoints.find((p) => p.x === Math.max(...devXpoints)) as Data;
            const pointsFromBaseToAdd = basePointsToAppendToDevLine(basePoints, developedPoints, maxPointInDev);
            return developedPoints.concat(pointsFromBaseToAdd);
        }
    };

    const getDataLines = (dataByType: { [p: string]: { LEFT: Data[]; RIGHT: Data[] } }) => {
        // assume dataByType is a normalized dict!
        let linesArray: any = [];
        examPointTypes.map((key) => {
            Object.keys(dataByType[key]).forEach((ear) => {
                const earAsType = ear as 'RIGHT' | 'LEFT';
                const typeOfPoint = key as ExamPointTypes;
                if (dataByType[key][earAsType].length > 0)
                    linesArray.push(
                        <VictoryLine
                            style={{ data: pointTypeToStyle(earAsType, typeOfPoint) }}
                            data={getPointsInLine(dataByType, typeOfPoint, earAsType)}
                        />
                    );
            });
        });

        return linesArray;
    };

    const normalizedDataByType = (data: { [p: string]: { LEFT: Data[]; RIGHT: Data[] } }) => {
        let results: { [p: string]: { LEFT: Data[]; RIGHT: Data[] } } = {};
        Object.keys(data).forEach((key) => {
            results[key] = { RIGHT: [], LEFT: [] };
            results[key].RIGHT = data[key].RIGHT ? data[key].RIGHT.map((data) => normalizePoint(data, xMargin, width)) : [];
            results[key].LEFT = data[key].LEFT ? data[key].LEFT.map((data) => normalizePoint(data, xMargin, width)) : [];
        });
        return results;
    };

    const moveCloseNormalizedPoints = (data: { [p: string]: { LEFT: Data[]; RIGHT: Data[] } }) => {
        const MOVE_STEP = width / 12;
        const Y_SCOPE = 2;
        const normalizedPoints = Object.values(data)
            .map((dataType) => [...dataType.LEFT, ...dataType.RIGHT])
            .flat(1);
        normalizedPoints.forEach((p1) => {
            let closedPoints: Data[] = [];
            normalizedPoints.forEach((p2) => {
                if (p1 != p2 && p1.x == p2.x && Math.abs(p1.y - p2.y) <= Y_SCOPE) closedPoints.push(p2);
            });
            let counter = 1;
            closedPoints.forEach((p) => {
                p.x += MOVE_STEP * counter;
                counter++;
            });
        });
    };

    const dataByTypeNormalized = normalizedDataByType(dataByTypes());
    moveCloseNormalizedPoints(dataByTypeNormalized);
    const allNormalizedPoints = Object.values(dataByTypeNormalized)
        .map((dataType) => [...dataType.LEFT, ...dataType.RIGHT])
        .flat(1);
    return (
        <VictoryChart theme={VictoryTheme.material} width={1000} height={500}>
            <VictoryAxis
                tickValues={xAxisPoints.map((x) => normalizeX(x, xMargin))}
                domain={[250, 8000]}
                style={{ ticks: { padding: 5 } }}
                tickFormat={(t, i) => {
                    if (invisiblePoints.includes(unNormalizeX(t, xMargin))) return '';
                    return unNormalizeX(t, xMargin);
                }}
            />
            <VictoryAxis dependentAxis tickValues={yAxisPoints} domain={[0, 120]} />

            {getDataLines(dataByTypeNormalized)}
            <VictoryScatter data={allNormalizedPoints} dataComponent={<ImagePoint />} />
        </VictoryChart>
    );
};
type ImagePointProps = {
    x: number;
    y: number;
    datum: {
        _y: number;
        _x: number;
        type: ExamPointTypes;
    };
};
const CatPoint = (props: any) => {
    const { x, y, datum } = props;
    const cat = datum._y >= 0 ? '😻' : '😹';
    return (
        <text x={x} y={y} fontSize={10}>
            {cat}
        </text>
    );
};

const ImagePoint = (props: any) => {
    const { x, y, datum } = props;

    return (
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" x={x} y={y}>
            <image href={pointToImage(datum.type, datum.ear, datum.isNoResponse)} height="10" width="10" />
        </svg>
    );
};
