import React from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";
const SubscriptionGraph = ({
    data: dbData,
    dataKey = "totalSubscriptionsAmount",
}) => {
    const data = dbData.map((item) => ({
        ...item,
        totalSubscriptionsAmount: Number(item.totalSubscriptionsAmount),
        totalSubscriptionsCount: Number(item.totalSubscriptionsCount),
    }));
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey={dataKey}
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default SubscriptionGraph;
