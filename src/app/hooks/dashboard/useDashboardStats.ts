// hooks/useDashboardStats.ts
import useSWR from 'swr';

export type StatsData = {
  totalOrders: number;
  activeProducts: number;
  totalRevenue: number;
  activeCustomers: number;
};

type StatBlock = {
  title: string;
  value: string | number;
  href: string;
  color: string;
  loading: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDashboardStats(): {
  dashboardData: StatBlock[];
  statsError: unknown;
} {
  const {
    data = {
      totalOrders: 0,
      activeProducts: 0,
      totalRevenue: 0,
      activeCustomers: 0,
    } as StatsData,
    isLoading,
    error,
  } = useSWR('/api/dashboard-data', fetcher, {
    refreshInterval: 5000,
  });

  const dashboardData: StatBlock[] = [
    {
      title: 'Total Paid Orders',
      value: data.totalOrders ?? 0,
      href: '/admin/orders',
      color: '#B22234',
      loading: isLoading,
    },
    {
      title: 'Total Products',
      value: data.activeProducts ?? 0,
      href: '/admin/products',
      color: '#0A3161',
      loading: isLoading,
    },
    {
      title: 'Total Earned',
      value: `$${(data.totalRevenue ?? 0).toFixed(0)}`,
      href: '/admin/finance',
      color: '#0A3161',
      loading: isLoading,
    },
    {
      title: 'Total Customers',
      value: data.activeCustomers ?? 0,
      href: '/admin/customers',
      color: '#B22234',
      loading: isLoading,
    },
  ];

  return { dashboardData, statsError: error };
}
