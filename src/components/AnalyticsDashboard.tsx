"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import React from "react";

interface AnalyticsDashboardProps {
  avgVisitorsPerday: string;
  amtVisitorsToday: number;
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-100/25 text-green-400 ring-green-400/25";
  const neutralClassname = "bg-zinc-100/25 text-zinc-400 ring-zinc-400/25";
  const negativeClassname = "bg-red-100/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNeutral
          ? neutralClassname
          : negativeClassname
      }`}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

export default function AnalyticsDashboard({
  avgVisitorsPerday,
  amtVisitorsToday,
  timeseriesPageviews,
}: AnalyticsDashboardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full">
          <p className="text-tremor-default text-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-tremor-content-strong font-semibold">
            {avgVisitorsPerday}
          </p>
        </Card>
        <Card className="w-full">
          <p className="flex gap-2.5 items-center text-tremor-default text-dark-tremor-content">
            Visitors today
            <Badge
              percentage={
                (amtVisitorsToday / Number(avgVisitorsPerday) - 1) * 100
              }
            />
          </p>
          <p className="text-3xl text-tremor-content-strong font-semibold">
            {amtVisitorsToday}
          </p>
        </Card>
      </div>
      <Card>
        {timeseriesPageviews ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeseriesPageviews.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            categories={["Visitors"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
}
