
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ReviewFilterProps {
  filter: string;
  setFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function ReviewFilter({ 
  filter, 
  setFilter, 
  searchQuery, 
  setSearchQuery 
}: ReviewFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[200px] lg:w-[300px]"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Videos</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewing">In Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
