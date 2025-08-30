
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Video, Camera, RotateCw, ScreenShare, ScreenShareOff, CameraOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function LiveMonitoring() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <RemoteCameraControl />
            <LiveScreenView />
            <LiveAudio />
        </div>
    );
}

export function RemoteCameraControl() {
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
            stopCamera();
        };
    }, []);

    const getCameraPermission = async (mode: 'user' | 'environment') => {
        stopCamera();
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

    const handleToggleCamera = (checked: boolean) => {
        if (checked) {
            getCameraPermission(facingMode);
        } else {
            stopCamera();
            setIsCameraActive(false);
            toast({
                title: `Live Camera Stopped`,
                description: `The camera feed has been turned off.`,
            });
        }
    };

    const handleSwitchCamera = () => {
        const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacingMode);
        if (isCameraActive) {
            getCameraPermission(newFacingMode);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Remote Camera Control</CardTitle>
                <CardDescription>Access the device's cameras remotely.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="w-full aspect-video rounded-md bg-muted flex items-center justify-center relative">
                    <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                    {!isCameraActive && (
                        <div className="absolute flex flex-col items-center gap-2 text-muted-foreground">
                            <CameraOff size={48} />
                            <span>Camera is off</span>
                        </div>
                    )}
                </div>
                 {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Switch id="camera-toggle" checked={isCameraActive} onCheckedChange={handleToggleCamera} />
                        <Label htmlFor="camera-toggle">{isCameraActive ? 'Cam On' : 'Cam Off'}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handleSwitchCamera} disabled={!isCameraActive} aria-label="Switch Camera">
                            <RotateCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground">Current camera: {facingMode === 'user' ? 'Front' : 'Back'}</p>
            </CardContent>
        </Card>
    );
}

export function LiveScreenView() {
    const { toast } = useToast();
    const screenRef = useRef<HTMLVideoElement>(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [hasScreenSharePermission, setHasScreenSharePermission] = useState<boolean | null>(null);

     const stopScreenShare = () => {
        if (screenRef.current && screenRef.current.srcObject) {
            const stream = screenRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            screenRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => {
            stopScreenShare();
        };
    }, []);

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
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                toast({
                    variant: 'destructive',
                    title: 'Screen Share Not Supported',
                    description: 'Your browser does not support screen sharing or you are not in a secure context (HTTPS).',
                });
                setHasScreenSharePermission(false);
                return;
            }
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
    return (
         <Card>
            <CardHeader>
                <CardTitle>Live Screen View</CardTitle>
                <CardDescription>Remotely view the device's screen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="w-full aspect-video rounded-md bg-muted flex items-center justify-center relative">
                    <video ref={screenRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                    {!isScreenSharing && (
                         <div className="absolute flex flex-col items-center gap-2 text-muted-foreground">
                            <ScreenShareOff size={48} />
                            <span>Screen monitoring is off</span>
                        </div>
                    )}
                </div>

                {hasScreenSharePermission === false && (
                    <Alert variant="destructive" className="h-full">
                        <AlertTitle>Screen Share Access Required</AlertTitle>
                        <AlertDescription>
                            Please grant permission to share your screen, or your browser may not support this feature.
                        </AlertDescription>
                    </Alert>
                )}
                 <Button onClick={handleToggleScreenShare} variant={isScreenSharing ? 'destructive' : 'default'} className="w-full">
                    {isScreenSharing ? <ScreenShareOff className="mr-2" /> : <ScreenShare className="mr-2" />}
                    {isScreenSharing ? 'Stop' : 'Start'} Monitoring
                </Button>
            </CardContent>
        </Card>
    );
}

export function LiveAudio() {
    const { toast } = useToast();
     const handleStartLiveAudio = () => {
        toast({
            title: `Live Audio Started`,
            description: `The live audio session has begun.`,
        });
    }

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Live Audio</CardTitle>
                <CardDescription>Listen to the device's microphone in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button onClick={handleStartLiveAudio} className="w-full">
                    <Mic className="mr-2" /> Listen
                 </Button>
            </CardContent>
        </Card>
    )
}
