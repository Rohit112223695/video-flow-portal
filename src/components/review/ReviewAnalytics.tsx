
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export function ReviewAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Review Analytics
        </h1>
        <Select defaultValue="month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Reviewed" value="127" />
        <StatCard title="Approved" value="98" className="text-green-600" />
        <StatCard title="Rejected" value="29" className="text-red-600" />
        <StatCard title="Review Rate" value="12.3/day" />
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Review Activity</h3>
        <div className="h-80 flex items-center justify-center border-b pb-4">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <BarChart3 className="h-16 w-16 mb-2 opacity-30" />
            <p>Chart visualization would appear here</p>
            <p className="text-sm">Showing review activity over time</p>
          </div>
        </div>
        <div className="pt-4 flex justify-between text-sm text-muted-foreground">
          <div>Apr 20</div>
          <div>Apr 25</div>
          <div>Apr 30</div>
          <div>May 5</div>
          <div>May 10</div>
          <div>May 15</div>
          <div>May 20</div>
        </div>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  className?: string;
}

function StatCard({ title, value, className }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`text-2xl font-bold ${className}`}>{value}</div>
      </div>
    </Card>
  );
}
