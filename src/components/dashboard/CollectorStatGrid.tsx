
import React from 'react';
import { StatCard } from './StatCard';
import { Upload, CheckCheck, XCircle, Clock } from 'lucide-react';

export function CollectorStatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Uploads"
        value="32"
        description="Your video submissions"
        trend="up"
        trendValue="5 new this month"
        icon={<Upload className="h-5 w-5" />}
      />
      <StatCard
        title="Approved"
        value="24"
        description="Videos that passed QU"
        icon={<CheckCheck className="h-5 w-5" />}
      />
      <StatCard
        title="Rejected"
        value="3"
        description="Videos requiring rework"
        icon={<XCircle className="h-5 w-5" />}
      />
      <StatCard
        title="In Review"
        value="5"
        description="Videos being processed"
        icon={<Clock className="h-5 w-5" />}
      />
    </div>
  );
}
