'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="grid gap-6 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact Number</Label>
                            <Input id="contact" type="tel" placeholder="+1 234 567 890" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="123 Main St" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Anytown" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" placeholder="USA" />
                        </div>
                        <div className="md:col-span-2">
                            <Button type="submit">Save Changes</Button>
                        </div>
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
                           <span className='flex items-center'><Shield className='mr-2' /> Enable Biometric Authentication</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Use your device's screen lock or biometrics to secure your account.
                            </span>
                        </Label>
                        <Switch id="biometrics" />
                    </div>
                     <div className="rounded-lg border p-4">
                        <Label htmlFor="pin-lock" className="flex flex-col space-y-1 mb-4">
                           <span className='flex items-center'><Lock className='mr-2' /> App Lock PIN</span>
                           <span className="font-normal leading-snug text-muted-foreground">
                                Set a 4-digit PIN to lock the application.
                            </span>
                        </Label>
                        <form className="flex items-center gap-4">
                            <Input id="pin-lock" type="password" placeholder="Enter 4-digit PIN" maxLength={4} className="max-w-xs" />
                            <Button type="submit">Set PIN</Button>
                        </form>
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
