
import React from 'react';
import { StatCard } from './StatCard';
import { Clock, CheckCheck, Video, Database } from 'lucide-react';

export function ReviewerStatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Review Queue"
        value="23"
        description="Videos awaiting your review"
        trend="down"
        trendValue="5% from yesterday"
        icon={<Clock className="h-5 w-5" />}
      />
      <StatCard
        title="Completed Today"
        value="7"
        description="Videos processed today"
        icon={<CheckCheck className="h-5 w-5" />}
      />
      <StatCard
        title="Total Reviewed"
        value="342"
        description="Your all-time reviews"
        icon={<Video className="h-5 w-5" />}
      />
      <StatCard
        title="Hours Logged"
        value="128"
        description="Total review time"
        trend="up"
        trendValue="12 hours this week"
        icon={<Database className="h-5 w-5" />}
      />
    </div>
  );
}
