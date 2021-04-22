import React, { useState } from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';

type Props = {};
type Data = {
    x: number;
    y: number;
    type?: string;
};
const CreateExamination = ({}: Props) => {
    const [data, setData] = useState<Data[]>([]);
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 8000], y: [0, 120] }}
            width={700}
            events={[
                {
                    target: 'parent',
                    eventHandlers: {
                        onClick: (e, props) => {
                            // console.log('CreateExamination : e', e);
                            console.log('CreateExamination : props', props);
                            setData([...data, { x: Math.floor(Math.random() * 8000) + 0, y: Math.floor(Math.random() * 120) + 0, type: 'test' }]);
                            return [];
                            // return [
                            //     {
                            //         target: 'data',
                            //         eventKey: 'all',
                            //         mutation: (props) => {
                            //             // console.log('CreateExamination : props', props);
                            //         }
                            //     }
                            // ];
                        }
                    }
                }
            ]}
        >
            <VictoryScatter data={data} dataComponent={<CatPoint />} />
            <VictoryLine data={data} />
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
    console.log('CreateExamination : props', props);
    const { x, y, datum } = props;
    const cat = datum._y >= 0 ? '😻' : '😹';
    return (
        <text x={x} y={y} fontSize={30}>
            {cat}
        </text>
    );
};
export default CreateExamination;
