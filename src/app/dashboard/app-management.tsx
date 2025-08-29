'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const initialApps = [
    { name: 'SocialApp', usage: '3h 45m', status: 'Allowed' },
    { name: 'GameZone', usage: '2h 15m', status: 'Blocked' },
    { name: 'EduLearn', usage: '1h 30m', status: 'Time Limit' },
    { name: 'VideoStream', usage: '4h 5m', status: 'Allowed' },
];

export function AppManagement() {
    const [apps, setApps] = useState(initialApps);
    const { toast } = useToast();

    const toggleBlock = (appName: string) => {
        setApps(currentApps => currentApps.map(app => {
            if (app.name === appName) {
                const newStatus = app.status === 'Blocked' ? 'Allowed' : 'Blocked';
                toast({
                    title: `App ${newStatus}`,
                    description: `${appName} has been ${newStatus.toLowerCase()}.`,
                });
                return {...app, status: newStatus };
            }
            return app;
        }));
    };

    return (
         <Card>
             <CardHeader>
                <CardTitle>App Management</CardTitle>
                <CardDescription>Block apps or set usage time limits.</CardDescription>
             </CardHeader>
             <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Application</TableHead>
                            <TableHead>Usage Today</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {apps.map(app => (
                            <TableRow key={app.name}>
                                <TableCell className="font-medium">{app.name}</TableCell>
                                <TableCell>{app.usage}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm">Set Limit</Button>
                                    <Button variant={app.status === 'Blocked' ? 'secondary' : 'destructive'} size="sm" onClick={() => toggleBlock(app.name)}>{app.status === 'Blocked' ? 'Unblock' : 'Block'}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </CardContent>
        </Card>
    );
}
