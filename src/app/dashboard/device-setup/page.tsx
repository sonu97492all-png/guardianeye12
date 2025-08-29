'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DeviceSetupPage() {
    const [showQr, setShowQr] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const generateQrCode = async () => {
        setIsLoading(true);
        try {
            // In a real application, you would generate a unique token for device pairing
            const pairingToken = `GuardianEye12-pairing-${Date.now()}-${Math.random().toString(36).substring(2)}`;
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pairingToken)}`;
            
            // Preload the image to prevent showing a broken image while loading
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
            setIsLoading(false);
        }
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
                        To start monitoring a device, install the GuardianEye12 companion app on it and scan the QR code below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
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
                            <Button onClick={generateQrCode} disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Generate QR Code
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
