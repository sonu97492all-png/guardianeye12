'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Loader2, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DeviceSetupPage() {
    const [showQr, setShowQr] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoadingQr, setIsLoadingQr] = useState(false);
    const [pairingCode, setPairingCode] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const { toast } = useToast();

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
                        To start monitoring a device, install the GuardianEye12 companion app on it and connect it to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="qrcode" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="qrcode"><QrCode className="mr-2"/>QR Code</TabsTrigger>
                            <TabsTrigger value="manual"><Link className="mr-2"/>Manual Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="qrcode" className="text-center mt-4">
                             <p className="text-sm text-muted-foreground mb-4">
                                Generate a QR code and scan it with the companion app on the child's device.
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
                                    <p className="text-sm text-muted-foreground">Scan this code with the companion app.</p>
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
                                Enter the 6-digit code displayed on the child's device.
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
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
