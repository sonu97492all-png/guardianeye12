
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Monitor,
  Eye,
  Lock,
  Mic,
  MoreHorizontal,
  PlusCircle,
  Smartphone,
  Trash2,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { monitoredDevices } from '@/data/devices';

export default function MonitoredDevicesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Monitored Devices</CardTitle>
            <CardDescription>View status and manage your connected devices.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/device-setup">
              <PlusCircle className="mr-2" /> Connect Device
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          {monitoredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function DeviceCard({ device }: { device: (typeof monitoredDevices)[0] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {device.type === 'mobile' ? (
              <Smartphone className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Monitor className="h-8 w-8 text-muted-foreground" />
            )}
            <div>
              <CardTitle className="text-xl">{device.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className={`h-2 w-2 rounded-full ${
                    device.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <span>
                  {device.status} - {device.os}
                </span>
              </div>
            </div>
          </div>
          <DeviceActionsMenu deviceId={device.id} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold">Screen Recording</h3>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Minutes</SelectItem>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Video />
            </Button>
          </div>
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold">Live Audio</h3>
          <Button className="w-full">
            <Mic className="mr-2" /> Start Listening
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DeviceActionsMenu({ deviceId }: { deviceId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/monitored-devices/${deviceId}`}>
            <Eye className="mr-2" /> View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Lock className="mr-2" /> Remote Lock
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2" /> Wipe Device
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
