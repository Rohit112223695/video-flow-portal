
import React from 'react';
import { StatCard } from './StatCard';
import { Clock, CheckCheck, Video, Database } from 'lucide-react';

export function SuperQUStatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="QU Queue"
        value="18"
        description="Videos requiring final QU"
        trend="up"
        trendValue="3% from yesterday"
        icon={<Clock className="h-5 w-5" />}
      />
      <StatCard
        title="Approved Today"
        value="12"
        description="Videos approved today"
        icon={<CheckCheck className="h-5 w-5" />}
      />
      <StatCard
        title="Total Processed"
        value="523"
        description="Your all-time QU processed"
        icon={<Video className="h-5 w-5" />}
      />
      <StatCard
        title="Rejection Rate"
        value="8.3%"
        description="Videos sent back for rework"
        trend="down"
        trendValue="2.1% from last month"
        icon={<Database className="h-5 w-5" />}
      />
    </div>
  );
}
