'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', usage: 240 },
  { day: 'Tue', usage: 138 },
  { day: 'Wed', usage: 380 },
  { day: 'Thu', usage: 290 },
  { day: 'Fri', usage: 420 },
  { day: 'Sat', usage: 230 },
  { day: 'Sun', usage: 350 },
];

const chartConfig = {
  usage: {
    label: 'Usage (minutes)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function WeeklyActivityChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickFormatter={(value) => `${value}m`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
