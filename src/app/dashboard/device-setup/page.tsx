'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Loader2, Link, Camera, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function DeviceSetupPage() {
    const [activeTab, setActiveTab] = useState('qrcode');
    const [showQr, setShowQr] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoadingQr, setIsLoadingQr] = useState(false);
    const [pairingCode, setPairingCode] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const { toast } = useToast();

    const scannerVideoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    const stopCamera = () => {
        if (scannerVideoRef.current && scannerVideoRef.current.srcObject) {
            const stream = scannerVideoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            scannerVideoRef.current.srcObject = null;
        }
    };
    
    useEffect(() => {
        if (activeTab !== 'scan') {
            stopCamera();
        } else {
             startScannerCamera();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startScannerCamera = async () => {
        stopCamera();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setHasCameraPermission(true);

            if (scannerVideoRef.current) {
                scannerVideoRef.current.srcObject = stream;
                // In a real app, you would integrate a QR code scanning library here
                // to process the video stream and detect QR codes.
                // For this demo, we'll just show the camera feed.
                setTimeout(() => {
                     toast({
                        title: 'Scanner Ready',
                        description: 'Point the camera at a QR code.',
                    });
                }, 1000)
            }
        } catch (error) {
            console.error('Error accessing camera for scanner:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions to use the scanner.',
            });
        }
    };

    const generateQrCode = async () => {
        setIsLoadingQr(true);
        try {
            const pairingToken = `GuardianEye12-pairing-${Date.now()}-${Math.random().toString(36).substring(2)}`;
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pairingToken)}`;
            
            const img = new window.Image();
            img.src = url;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            
            setQrCodeUrl(url);
            setShowQr(true);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error Generating QR Code',
                description: 'Could not generate a new QR code. Please try again.',
            });
        } finally {
            setIsLoadingQr(false);
        }
    };

    const handleManualConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pairingCode) {
            toast({
                variant: 'destructive',
                title: 'Pairing Code Required',
                description: 'Please enter the pairing code from the child device.',
            });
            return;
        }
        setIsConnecting(true);
        toast({
            title: 'Connecting...',
            description: 'Attempting to connect to the device.',
        });
        // Simulate connection attempt
        setTimeout(() => {
            // In a real app, you would verify the code with your backend
            toast({
                title: 'Device Connected!',
                description: `Successfully connected to device with code: ${pairingCode}.`,
            });
            setPairingCode('');
            setIsConnecting(false);
        }, 2000);
    };

    const hideQrCode = () => {
        setShowQr(false);
        setQrCodeUrl('');
    }

    return (
        <div className="flex justify-center items-start pt-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Connect a New Device</CardTitle>
                    <CardDescription>
                        Follow the steps below to connect and start monitoring a new device.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                        <h3 className="font-semibold mb-2">Instructions for Child's Device:</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Install the <strong>GuardianEye12 Companion</strong> app from the app store.</li>
                            <li>Open the app and grant necessary permissions.</li>
                            <li>Follow the app's instructions to either display a QR code/manual code, or to scan one from this parent app.</li>
                        </ol>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="qrcode"><QrCode className="mr-2"/>Generate Code</TabsTrigger>
                            <TabsTrigger value="manual"><Link className="mr-2"/>Enter Code</TabsTrigger>
                            <TabsTrigger value="scan"><ScanLine className="mr-2"/>Scan Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="qrcode" className="text-center mt-4">
                             <p className="text-sm text-muted-foreground mb-4">
                                Generate a unique QR code for the child's device to scan.
                            </p>
                            {showQr ? (
                                <div className="flex flex-col items-center gap-4 animate-fade-in">
                                    {qrCodeUrl ? (
                                        <Image
                                            src={qrCodeUrl}
                                            alt="QR Code"
                                            width={250}
                                            height={250}
                                            data-ai-hint="qr code"
                                            className="rounded-lg shadow-md"
                                        />
                                    ) : null}
                                    <p className="text-sm font-bold">Scan this with the child's device.</p>
                                    <Button variant="outline" onClick={hideQrCode}>Hide Code</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 py-8">
                                    <QrCode className="w-20 h-20 text-muted-foreground/50" />
                                    <Button onClick={generateQrCode} disabled={isLoadingQr}>
                                        {isLoadingQr ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Generate QR Code
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="manual" className="mt-4">
                             <p className="text-sm text-muted-foreground mb-4">
                                On the child's device, find the 6-digit manual pairing code and enter it here.
                            </p>
                            <form onSubmit={handleManualConnect} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pairing-code">Pairing Code</Label>
                                    <Input 
                                        id="pairing-code" 
                                        placeholder="e.g., 123456" 
                                        value={pairingCode}
                                        onChange={(e) => setPairingCode(e.target.value)}
                                        maxLength={6}
                                        />
                                </div>
                                <Button type="submit" className="w-full" disabled={isConnecting}>
                                    {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Connect Device
                                </Button>
                            </form>
                        </TabsContent>
                         <TabsContent value="scan" className="mt-4">
                            <p className="text-sm text-muted-foreground mb-4">
                                Use your camera to scan the QR code displayed on the child's device.
                            </p>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-full aspect-video rounded-md bg-muted relative">
                                    <video ref={scannerVideoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                                </div>
                                {hasCameraPermission === false && (
                                    <Alert variant="destructive">
                                        <Camera className="h-4 w-4" />
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                            Please allow camera access in your browser to use the QR scanner.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
