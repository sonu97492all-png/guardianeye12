'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Video, Camera, RotateCw, ScreenShare, ScreenShareOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function LiveMonitoring() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const screenRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [hasScreenSharePermission, setHasScreenSharePermission] = useState<boolean | null>(null);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };
    
    const stopScreenShare = () => {
        if (screenRef.current && screenRef.current.srcObject) {
            const stream = screenRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            screenRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup: stop video stream when component unmounts
            stopCamera();
            stopScreenShare();
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

    const handleToggleScreenShare = async () => {
        if (isScreenSharing) {
            stopScreenShare();
            setIsScreenSharing(false);
            setHasScreenSharePermission(null);
            toast({
                title: `Screen Monitoring Stopped`,
                description: `You have stopped viewing the device's screen.`,
            });
        } else {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                setHasScreenSharePermission(true);
                if (screenRef.current) {
                    screenRef.current.srcObject = stream;
                    stream.getVideoTracks()[0].onended = () => {
                        setIsScreenSharing(false);
                         setHasScreenSharePermission(null);
                         toast({
                            title: `Screen Monitoring Stopped`,
                            description: `The screen share session has ended.`,
                        });
                    };
                }
                setIsScreenSharing(true);
                toast({
                    title: `Screen Monitoring Started`,
                    description: `You are now viewing the device's screen.`,
                });
            } catch (error) {
                console.error('Error starting screen share:', error);
                setHasScreenSharePermission(false);
                setIsScreenSharing(false);
                toast({
                    variant: 'destructive',
                    title: 'Screen Share Access Denied',
                    description: 'Could not start screen sharing. Please grant permission and try again.',
                });
            }
        }
    };

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
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                        {hasCameraPermission === false && (
                            <Alert variant="destructive" className="h-full">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature.
                                </AlertDescription>
                            </Alert>
                        )}
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Camera className="h-5 w-5 text-muted-foreground" />
                                <span>Live Camera</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={handleSwitchCamera} disabled={!isCameraActive}>
                                    <RotateCw className="h-4 w-4" />
                                </Button>
                                <Button onClick={handleToggleCamera} variant={isCameraActive ? 'destructive' : 'default'}>
                                    {isCameraActive ? 'Turn Off' : 'Turn On'}
                                </Button>
                            </div>
                        </div>
                    </div>
                     <div className="flex flex-col gap-2">
                        <video ref={screenRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                        {hasScreenSharePermission === false && (
                            <Alert variant="destructive" className="h-full">
                                <AlertTitle>Screen Share Access Required</AlertTitle>
                                <AlertDescription>
                                    Please grant permission to share your screen.
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Video className="h-5 w-5 text-muted-foreground" />
                                <span>Screen Monitoring</span>
                            </div>
                             <Button onClick={handleToggleScreenShare} variant={isScreenSharing ? 'destructive' : 'default'}>
                                {isScreenSharing ? <ScreenShareOff className="mr-2" /> : <ScreenShare className="mr-2" />}
                                {isScreenSharing ? 'Stop' : 'Start'} Monitoring
                            </Button>
                        </div>
                    </div>
                </div>

                 <div className="flex items-center justify-between border-t pt-4">
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
