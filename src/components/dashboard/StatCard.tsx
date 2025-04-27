
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue,
  className 
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                )}
                {trend === 'down' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                )}
                <span 
                  className={cn(
                    "text-xs font-medium",
                    trend === 'up' && "text-green-500",
                    trend === 'down' && "text-red-500",
                    trend === 'neutral' && "text-muted-foreground"
                  )}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="rounded-full p-2 bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
