
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function LocationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin /> Real-time Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative aspect-video">
                <Image
                    src="https://picsum.photos/800/400"
                    alt="Map"
                    fill
                    data-ai-hint="street map"
                    className="object-cover rounded-b-lg"
                />
                <div className="absolute bottom-2 left-2 bg-background/80 p-2 rounded-md text-xs">
                    <p className="font-semibold">San Francisco, CA</p>
                    <p>40.7128° N, 74.0060° W</p>
                    <p>Last updated: Just now</p>
                </div>
            </CardContent>
        </Card>
    );
}
