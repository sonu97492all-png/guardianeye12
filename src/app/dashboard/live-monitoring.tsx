'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Video, Camera, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function LiveMonitoring() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup: stop video stream when component unmounts
            stopCamera();
        };
    }, []);

    const getCameraPermission = async (mode: 'user' | 'environment') => {
        stopCamera(); // Stop any existing stream
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
            setHasCameraPermission(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraActive(true);
            toast({
                title: `Live Camera Started`,
                description: `Using ${mode === 'user' ? 'front' : 'back'} camera.`,
            });
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            setIsCameraActive(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings.',
            });
        }
    };

    const handleToggleCamera = () => {
        if (isCameraActive) {
            stopCamera();
            setIsCameraActive(false);
            toast({
                title: `Live Camera Stopped`,
                description: `The camera feed has been turned off.`,
            });
        } else {
            getCameraPermission(facingMode);
        }
    };

    const handleSwitchCamera = () => {
        const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacingMode);
        if (isCameraActive) {
            getCameraPermission(newFacingMode);
        }
    };

    const handleStartScreenRecording = () => {
         toast({
            title: `Screen Recording Started`,
            description: `The screen recording session has begun.`,
        });
    }

    const handleStartLiveAudio = () => {
        toast({
            title: `Live Audio Started`,
            description: `The live audio session has begun.`,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Monitoring</CardTitle>
                <CardDescription>Access device screen, camera, and audio in real-time.</CardDescription>
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
                        <Camera className="h-5 w-5 text-muted-foreground" />
                        <span>Live Camera</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handleSwitchCamera} disabled={!isCameraActive}>
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleToggleCamera}>
                            {isCameraActive ? 'Turn Off' : 'Turn On'}
                        </Button>
                    </div>
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
                        <Button onClick={handleStartScreenRecording}>
                            Start
                        </Button>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                        <span>Live Audio</span>
                    </div>
                    <Button onClick={handleStartLiveAudio}>Listen</Button>
                </div>
            </CardContent>
        </Card>
    );
}
