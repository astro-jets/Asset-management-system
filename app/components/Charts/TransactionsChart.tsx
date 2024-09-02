import { LineChart } from '@tremor/react';

type chartdataProps = {
    chartdata: {
        date: string; claim: string; subscription: string
    }[]

}


const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}`;

export function TransactionsChart({ chartdata }: chartdataProps) {
    return (
        <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['Claims', 'Subscriptions']}
            colors={['red', 'indigo',]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}