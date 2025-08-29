import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import { WeeklyActivityChart } from '../weekly-activity-chart';

export default function ReportsPage() {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Activity Reports</CardTitle>
                <CardDescription>
                    Review and download summarized activity reports for your family's devices.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end gap-2 mb-4">
                    <Button variant="secondary">Last 7 Days</Button>
                    <Button variant="ghost">Last 30 Days</Button>
                    <Button variant="ghost">Custom Range</Button>
                </div>
                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2"><FileText /> Weekly Report</CardTitle>
                         <CardDescription>A summary of device usage from the past week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <WeeklyActivityChart />
                        <div className="mt-6 flex flex-col gap-4">
                            <h3 className="font-semibold">Key Highlights</h3>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>Total screen time: 25 hours, 45 minutes (+10% from last week).</li>
                                <li>Most used app: SocialApp (15 hours).</li>
                                <li>3 new content alerts triggered.</li>
                                <li>Device location was tracked within the safe zone 98% of the time.</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
    </div>
  );
}
