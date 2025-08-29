'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

export default function DeviceSetupPage() {
    const [showQr, setShowQr] = useState(false);

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
                            <Image
                                src="https://placehold.co/250x250/E8EAF6/3F51B5?text=QR+CODE"
                                alt="QR Code"
                                width={250}
                                height={250}
                                data-ai-hint="qr code"
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-sm text-muted-foreground">Scan this code with the companion app.</p>
                            <Button variant="outline" onClick={() => setShowQr(false)}>Hide Code</Button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-8">
                             <QrCode className="w-20 h-20 text-muted-foreground/50" />
                            <Button onClick={() => setShowQr(true)}>Generate QR Code</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
