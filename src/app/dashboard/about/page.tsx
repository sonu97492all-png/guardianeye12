import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Eye className="w-10 h-10 text-primary" />
            <div>
              <CardTitle>About GuardianEye12</CardTitle>
              <CardDescription>Your trusted partner in digital safety.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            GuardianEye12 is a comprehensive monitoring solution designed to help you ensure the digital well-being of your loved ones. Our application provides a powerful set of tools to keep you informed and in control.
          </p>
          <h3 className="font-semibold text-lg text-card-foreground pt-4">Our Mission</h3>
          <p>
            In an increasingly digital world, our mission is to provide peace of mind by offering a reliable and user-friendly platform for monitoring device activity. We believe in empowering users with the information they need to foster a safe and healthy online environment.
          </p>
          <h3 className="font-semibold text-lg text-card-foreground pt-4">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Live Monitoring:</strong> Remotely access device cameras, screen views, and audio feeds in real-time.</li>
            <li><strong>App Management:</strong> Block unwanted applications or set time limits to control usage.</li>
            <li><strong>Call & SMS History:</strong> Keep track of incoming, outgoing, and missed calls.</li>
            <li><strong>Location Tracking:</strong> View the real-time location of monitored devices on a map.</li>
            <li><strong>Content Filtering:</strong> Use AI-powered tools to analyze social media content for potential dangers.</li>
            <li><strong>Activity Reports:</strong> Generate and download detailed reports on device usage and activity.</li>
          </ul>
           <div className="pt-6 text-center text-xs">
             © {new Date().getFullYear()} GuardianEye12. All rights reserved.
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
