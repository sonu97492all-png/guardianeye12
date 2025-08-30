
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, MapPin, Smartphone } from "lucide-react";
import Link from "next/link";
import { AppManagement } from "../../app-management";
import { CallHistory } from "../../call-history";
import { LiveAudio, LiveScreenView, RemoteCameraControl } from "../../live-monitoring";
import { LocationCard } from "../location";

// Mock data, in a real app you would fetch this based on params.deviceId
const device = {
  id: '1',
  name: "Daniel's iPhone 14",
  status: 'Online',
  os: 'iOS 17.5',
  type: 'mobile',
  ip: '192.168.1.101',
  lastSync: '0 seconds ago',
  location: 'San Francisco, CA'
};


export default function DeviceDetailPage({ params }: { params: { deviceId: string } }) {

    // In a real app, you would fetch device data based on params.deviceId
    // const [device, setDevice] = useState(null);
    // useEffect(() => { ... fetch data ... }, [params.deviceId]);

    return (
        <div className="grid gap-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/monitored-devices">
                        <ChevronLeft />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Device Details</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <Smartphone className="h-10 w-10 text-muted-foreground" />
                            <div>
                                <CardTitle>{device.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                     <span className="h-2 w-2 rounded-full bg-green-500" />
                                    {device.status} - {device.os}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                               <dt className="font-medium text-muted-foreground">Device Type</dt>
                               <dd>Phone</dd>
                               <dt className="font-medium text-muted-foreground">Operating System</dt>
                               <dd>{device.os}</dd>
                               <dt className="font-medium text-muted-foreground">IP Address</dt>
                               <dd>{device.ip}</dd>
                               <dt className="font-medium text-muted-foreground">Status</dt>
                               <dd>{device.status}</dd>
                               <dt className="font-medium text-muted-foreground">Last Sync</dt>
                               <dd>{device.lastSync}</dd>
                               <dt className="font-medium text-muted-foreground">Last Known Location</dt>
                               <dd>{device.location}</dd>
                           </dl>
                        </CardContent>
                    </Card>
                    <LocationCard />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <RemoteCameraControl />
                    <LiveScreenView />
                    <LiveAudio />
                    <AppManagement />
                    <CallHistory />
                </div>
            </div>

        </div>
    );
}
