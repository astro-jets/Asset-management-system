import { LineChart } from '@tremor/react';

type chartdataProps = {
    chartdata: {
        date: string; claim: string; subscription: string
    }[]
}


const dataFormatter = (number: number) => `K${Intl.NumberFormat('us').format(number).toString()}`;

export function PaymentsChart({ chartdata }: chartdataProps) {
    return (
        <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['Payments']}
            colors={['orange']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}