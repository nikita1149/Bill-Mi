import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";

const Graph = ({ data }) => {
    //sort data according to name
    data.sort((a, b) => {
        return a.name.split('-')[0] - b.name.split('-')[0];
    });

    console.log(data);

    return (
        <ResponsiveContainer height={150}>
            <LineChart data={data}>
                <XAxis fontSize={''} dataKey={'name'}/>
                <Tooltip/>
                <Line type="monotone" dataKey="amount" stroke="#6d6d6d" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Graph;