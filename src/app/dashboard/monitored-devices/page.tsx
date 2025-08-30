
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
import { Separator } from '@/components/ui/separator';
import {
  Desktop,
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

const monitoredDevices = [
  {
    name: "Daniel's iPhone 14",
    status: 'Online',
    os: 'iOS 17.5',
    type: 'mobile',
    ip: '192.168.1.101',
    email: 'daniel.doe@icloud.com',
    contact: '+1-202-555-0191',
  },
  {
    name: 'Family Desktop',
    status: 'Offline',
    os: 'Windows 11',
    type: 'desktop',
    ip: '192.168.1.102',
    email: 'family.doe@outlook.com',
    contact: 'N/A',
  },
];

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
            <DeviceCard key={device.name} device={device} />
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
              <Desktop className="h-8 w-8 text-muted-foreground" />
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
          <DeviceActionsMenu />
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

function DeviceActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="mr-2" /> View Details
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
