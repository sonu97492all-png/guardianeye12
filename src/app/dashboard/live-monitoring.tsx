'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function LiveMonitoring() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup: stop video stream when component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
        toast({
            title: `Screen Recording Started`,
            description: `The screen recording session has begun.`,
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsCameraActive(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    const handleStart = (type: string) => {
        if (type === 'Screen Recording') {
            if (isCameraActive) {
                // Stop the camera
                if (videoRef.current && videoRef.current.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach(track => track.stop());
                    videoRef.current.srcObject = null;
                }
                setIsCameraActive(false);
                 toast({
                    title: `Screen Recording Stopped`,
                    description: `The screen recording session has ended.`,
                });
            } else {
                getCameraPermission();
            }
        } else {
             toast({
                title: `${type} Started`,
                description: `The ${type.toLowerCase()} session has begun.`,
            });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Monitoring</CardTitle>
                <CardDescription>Access device screen and audio in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex flex-col gap-4">
                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                    {hasCameraPermission === false && (
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access to use this feature.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
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
                        <Button onClick={() => handleStart('Screen Recording')}>
                            {isCameraActive ? 'Stop' : 'Start'}
                        </Button>
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
