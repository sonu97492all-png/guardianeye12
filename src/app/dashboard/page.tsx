
import {
  Activity,
  AppWindow,
  Bell,
  MessageCircle,
  Shield,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WeeklyActivityChart } from './weekly-activity-chart';
import { AppManagement } from './app-management';
import { CallHistory } from './call-history';
import { LocationCard } from './monitored-devices/location';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="animate-fade-in grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Antivirus Status</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Protected</div>
                    <p className="text-xs text-muted-foreground">Last scan: 2 days ago</p>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Antivirus Protection</CardTitle>
                        <CardDescription>Scan the device for viruses and malware.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            <Shield className="mr-2" /> Start Scan
                        </Button>
                    </CardContent>
                </Card>
                <CallHistory />
            </div>
        </div>
    </div>
  );
}
