import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PhoneIncoming, PhoneOutgoing } from "lucide-react";

const callHistory = [
    { type: 'incoming', contact: 'Mom', duration: '5m 21s', time: '10:45 AM' },
    { type: 'outgoing', contact: 'Alex', duration: '12m 3s', time: '11:02 AM' },
    { type: 'missed', contact: 'Unknown', duration: '0m 0s', time: '11:15 AM' },
    { type: 'incoming', contact: 'Dad', duration: '8m 45s', time: '11:30 AM' },
    { type: 'outgoing', contact: 'Work', duration: '25m 10s', time: '12:05 PM' },
];

export function CallHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>View recent call logs from the device.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {callHistory.map((call, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {call.type === 'incoming' && <PhoneIncoming className="h-4 w-4 text-green-500" />}
                                        {call.type === 'outgoing' && <PhoneOutgoing className="h-4 w-4 text-blue-500" />}
                                        {call.type === 'missed' && <PhoneOutgoing className="h-4 w-4 text-red-500" />}
                                        <span className="capitalize">{call.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{call.contact}</TableCell>
                                <TableCell>{call.duration}</TableCell>
                                <TableCell className="text-right">{call.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
