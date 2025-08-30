
import {
  Activity,
  AppWindow,
  Bell,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WeeklyActivityChart } from './weekly-activity-chart';
import { LiveMonitoring } from './live-monitoring';
import { AppManagement } from './app-management';
import { CallHistory } from './call-history';
import { LocationCard } from './monitored-devices/location';

export default function DashboardPage() {
  return (
    <div className="animate-fade-in grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">+5 from last week</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">SMS Monitored</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">132</div>
                    <p className="text-xs text-muted-foreground">+12 from last week</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">App Usage Today</CardTitle>
                    <AppWindow className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">7h 21m</div>
                    <p className="text-xs text-muted-foreground">-30m from yesterday</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">New content alerts</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity /> Weekly Activity</CardTitle>
                    <CardDescription>Device usage in minutes per day.</CardDescription>
                </CardHeader>
                <CardContent>
                    <WeeklyActivityChart />
                </CardContent>
            </Card>
           <LocationCard />
        </div>
         <div className="grid gap-6 md:grid-cols-2">
            <AppManagement />
             <div className='grid gap-6'>
                <CallHistory />
            </div>
        </div>
    </div>
  );
}
