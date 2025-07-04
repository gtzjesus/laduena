'use client';

import QuickStatsSection from '@/components/dashboard/QuickStatsSection';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import RevenueBarChart from '@/components/dashboard/RevenueBarChart';
import { useDashboardStats } from '@/app/hooks/dashboard/useDashboardStats';
import { useRecentOrders } from '@/app/hooks/dashboard/useRecentOrders';
import { useRevenueStats } from '@/app/hooks/dashboard/useRevenueStats';
import RevenueIntervalToggle from '@/components/dashboard/RevenueIntervalToggle';
import OrderNotifications from '@/components/orders/OrderNotifications';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const [interval, setInterval] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  );

  const { dashboardData, statsError } = useDashboardStats();
  const { recentOrders, ordersLoading, ordersError } = useRecentOrders();
  const {
    revenueData,
    loading: revenueLoading,
    error: revenueError,
  } = useRevenueStats(interval);

  if (statsError) {
    return <p className="text-flag-red">Error loading stats.</p>;
  }

  return (
    <>
      <RevenueIntervalToggle onChangeAction={setInterval} active={interval} />
      {revenueError && <p className="text-flag-red">{revenueError}</p>}
      {!revenueLoading && !revenueError && (
        <RevenueBarChart data={revenueData} interval={interval} />
      )}
      <QuickStatsSection data={dashboardData} />
      <RecentOrdersTable
        recentOrders={recentOrders}
        ordersLoading={ordersLoading}
        ordersError={ordersError}
      />
      <OrderNotifications recentOrders={recentOrders} />
    </>
  );
}
