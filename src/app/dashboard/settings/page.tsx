'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
    return (
        <div className="grid gap-6 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <Button type="submit">Update Password</Button>
                    </form>
                    <Separator />
                     <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="biometrics" className="flex flex-col space-y-1">
                            <span>Enable Biometric Authentication</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Use your device's screen lock or biometrics to secure your account.
                            </span>
                        </Label>
                        <Switch id="biometrics" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Choose what you want to be notified about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="content-alerts" className="font-medium">Content Alerts</Label>
                        <Switch id="content-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="app-limit-alerts" className="font-medium">App Limit Alerts</Label>
                        <Switch id="app-limit-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="location-alerts" className="font-medium">Location Alerts (Safe Zones)</Label>
                        <Switch id="location-alerts" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
