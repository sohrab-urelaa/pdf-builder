import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

const UserRegistrationGraph = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey={"userRegistered"} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="userRegistered"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default UserRegistrationGraph;
