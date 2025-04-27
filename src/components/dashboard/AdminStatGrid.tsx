
import React from 'react';
import { StatCard } from './StatCard';
import { Video, Users, CheckCheck, Clock } from 'lucide-react';

export function AdminStatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Videos"
        value="3,249"
        description="All uploaded videos"
        trend="up"
        trendValue="12% from last month"
        icon={<Video className="h-5 w-5" />}
      />
      <StatCard
        title="Active Users"
        value="284"
        description="Users across all roles"
        trend="neutral"
        trendValue="Same as last month"
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard
        title="Completed Reviews"
        value="1,832"
        description="Successfully processed"
        trend="up"
        trendValue="8% from last month"
        icon={<CheckCheck className="h-5 w-5" />}
      />
      <StatCard
        title="Pending Reviews"
        value="147"
        description="Waiting for review"
        trend="down"
        trendValue="3% from last month"
        icon={<Clock className="h-5 w-5" />}
      />
    </div>
  );
}
