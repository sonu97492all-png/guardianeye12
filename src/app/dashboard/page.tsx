import {
  Activity,
  AppWindow,
  Bell,
  MapPin,
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
import Image from 'next/image';
import { WeeklyActivityChart } from './weekly-activity-chart';
import { LiveMonitoring } from './live-monitoring';
import { AppManagement } from './app-management';

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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MapPin /> Real-time Location</CardTitle>
                    <CardDescription>Last known location of the device.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Image
                        src="https://picsum.photos/800/400"
                        alt="Map"
                        width={800}
                        height={400}
                        data-ai-hint="street map"
                        className="w-full h-auto object-cover rounded-b-lg aspect-[2/1]"
                    />
                </CardContent>
            </Card>
        </div>
         <div className="grid gap-6 md:grid-cols-2">
            <LiveMonitoring />
            <AppManagement />
        </div>
    </div>
  );
}
