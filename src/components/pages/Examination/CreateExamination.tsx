import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryLabel, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';

type Props = {};
type Data = {
    x: number;
    y: number;
    type?: string;
};

const normalizeX = (realX: number, xMargin: number) => {
    const indexInXvalues = xAxisPoints.indexOf(realX);
    return xMargin + xMargin * indexInXvalues;
};

const unNormalizeX = (normalizeX: number, xMargin: number) => {
    const indexInXvalues = normalizeX / xMargin - 1;
    return xAxisPoints[indexInXvalues];
};

export const roundXpoint = (x: number) => {
    if (x < xAxisPoints[0]) throw new Error(`Lower bound is ${xAxisPoints[0]}`);
    let minDist = 10000; // bigger then any dist, must be 22000+.
    let roundedX = -1;

    // find closet x in X-Axis
    xAxisPoints.forEach((curX) => {
        let dist = Math.abs(curX - x);
        if (dist < minDist) {
            roundedX = curX;
            minDist = dist;
        }
    });
    console.log('*', roundedX);
    return roundedX;
};

export const normalizePoint = (point: Data, xMargin: number) => {
    console.log(point);
    const newPoint = { ...point };
    console.log('Should be x=', roundXpoint(newPoint.x), 'y=', newPoint.y);
    newPoint.x = normalizeX(roundXpoint(newPoint.x), xMargin);
    console.log(newPoint);
    return newPoint;
};

export const xAxisPoints = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
export const invisiblePoints = [750, 1500, 3000, 6000];
export const yAxisPoints = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

const CreateExamination = ({}: Props) => {
    const [data, setData] = useState<Data[]>([]);

    const xMargin = 8000 / xAxisPoints.length;
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={1000}
            height={500}
            events={[
                {
                    target: 'parent',
                    eventHandlers: {
                        onClick: (e: any, props) => {
                            setData([...data, { x: Math.floor(Math.random() * 8000) + 250, y: Math.floor(Math.random() * 120) + 0, type: 'test' }]);
                            return [];
                        }
                    }
                }
            ]}
        >
            <VictoryAxis
                tickValues={xAxisPoints.map((x) => normalizeX(x, xMargin))}
                domain={[250, 8000]}
                style={{ ticks: { padding: 5 } }}
                tickFormat={(t, i) => {
                    console.log(t);
                    if (invisiblePoints.includes(unNormalizeX(t, xMargin))) return '';
                    return unNormalizeX(t, xMargin);
                }}
            />
            <VictoryAxis dependentAxis tickValues={yAxisPoints} domain={[0, 120]} />
            <VictoryLine data={data.map((point) => normalizePoint(point, xMargin))} />
            <VictoryScatter data={data.map((point) => normalizePoint(point, xMargin))} dataComponent={<CatPoint />} />
        </VictoryChart>
    );
};
type CatPointProps = {
    x: number;
    y: number;
    datum: {
        _y: number;
        _x: number;
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

const LabelPoint = (props: any) => {
    const { x, y, datum } = props;
    return (
        <text x={x} y={y} fontSize={4}>
            ({x},{y})
        </text>
    );
};
export default CreateExamination;
