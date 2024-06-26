import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getDate } from "@/utils";
import { analytics } from "@/utils/analytics";
import React from "react";

type Props = {};

export default async function AnalyticsPage({}: Props) {
  const TRACKING_DAYS = 7;

  const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS);

  const totalPageviews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1);

  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto">
        <AnalyticsDashboard
          avgVisitorsPerday={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeseriesPageviews={pageviews}
        />
      </div>
    </div>
  );
}
