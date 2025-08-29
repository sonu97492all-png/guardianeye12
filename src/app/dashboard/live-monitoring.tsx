'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LiveMonitoring() {
    const { toast } = useToast();

    const handleStart = (type: string) => {
        toast({
            title: `${type} Started`,
            description: `The ${type.toLowerCase()} session has begun.`,
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Monitoring</CardTitle>
                <CardDescription>Access device screen and audio in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-muted-foreground" />
                        <span>Screen Recording</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="1h">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1h">1 Hour</SelectItem>
                                <SelectItem value="3h">3 Hours</SelectItem>
                                <SelectItem value="5h">5 Hours</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => handleStart('Screen Recording')}>Start</Button>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                        <span>Live Audio</span>
                    </div>
                    <Button onClick={() => handleStart('Live Audio')}>Listen</Button>
                </div>
            </CardContent>
        </Card>
    );
}
