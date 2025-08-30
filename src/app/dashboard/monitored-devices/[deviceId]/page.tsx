"use client";

import { use } from "react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { monitoredDevices } from "@/data/devices";
import { LiveMonitoring } from "../../live-monitoring";
import { LocationCard } from "../location";
import { AppManagement } from "../../app-management";
import { CallHistory } from "../../call-history";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Monitor, Wifi, Signal, Mail, Phone, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeviceDetailPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { toast } = useToast();
  const { deviceId } = use(params);

  const [device, setDevice] = useState(() =>
    monitoredDevices.find((d) => d.id === deviceId)
  );

  const handleToggleLock = () => {
    if (device) {
       setDevice(d => d ? {...d, locked: !d.locked} : d)
      toast({
        title: `Device ${device.locked ? 'Unlocked' : 'Locked'}`,
        description: `${device.name} has been remotely ${device.locked ? 'unlocked' : 'locked'}.`,
      });
    }
  };

  if (!device) {
    return (
        <div className="flex items-center justify-center h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Device Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The requested device could not be found.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         {device.type === 'mobile' ? <Smartphone className="w-10 h-10 text-primary" /> : <Monitor className="w-10 h-10 text-primary" />}
                        <div>
                            <CardTitle>{device.name}</CardTitle>
                            <CardDescription>{device.os}</CardDescription>
                        </div>
                    </div>
                     <Button onClick={handleToggleLock} variant={device.locked ? 'destructive' : 'default'}>
                        {device.locked ? 'Unlock' : 'Lock'} Device
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Wifi className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Status</p>
                        <p className="text-muted-foreground flex items-center gap-2">
                             <span className={`h-2 w-2 rounded-full ${device.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            {device.status}
                        </p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Signal className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">SIM Operator</p>
                        <p className="text-muted-foreground">{device.operator}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Power className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">IP Address</p>
                        <p className="text-muted-foreground">{device.ip}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Registered Email</p>
                        <p className="text-muted-foreground">{device.email}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Contact</p>
                        <p className="text-muted-foreground">{device.contact}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <LiveMonitoring />
        <LocationCard />

        <div className="grid gap-6 md:grid-cols-2">
            <AppManagement />
            <CallHistory />
        </div>

    </div>
  );
}
