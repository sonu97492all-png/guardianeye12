'use client';

import { useState } from 'react';
import { filterSocialMediaContent, FilterSocialMediaContentOutput } from '@/ai/flows/social-media-content-filter';
import { AlertCircle, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type State = {
    result: FilterSocialMediaContentOutput | null;
    error: string | null;
    pending: boolean;
};

export default function SocialMediaPage() {
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('danger, threat, harm, attack');
  const [state, setState] = useState<State>({ result: null, error: null, pending: false });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !keywords) {
        setState({ result: null, error: 'Content and keywords are required.', pending: false });
        return;
    }
    setState({ result: null, error: null, pending: true });
    try {
        const result = await filterSocialMediaContent({ content, keywords });
        setState({ result, error: null, pending: false });
    } catch (error) {
        setState({ result: null, error: 'An error occurred while filtering content.', pending: false });
    }
  }

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Content Filter</CardTitle>
          <CardDescription>
            Analyze social media posts for potentially dangerous content using AI. Enter the content and a comma-separated list of keywords to check against.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Content to Analyze</Label>
              <Textarea
                id="content"
                placeholder="Paste social media post content here..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g., danger, threat, harm"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={state.pending}>
              {state.pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Analyze Content
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {state.result && (
        <Alert variant={state.result.isDangerous ? 'destructive' : 'default'} className="bg-card">
            {state.result.isDangerous ? (
                <ShieldX className="h-4 w-4" />
            ) : (
                <ShieldCheck className="h-4 w-4" />
            )}
            <AlertTitle>
                {state.result.isDangerous ? 'Potentially Dangerous Content Detected' : 'Content Appears Safe'}
            </AlertTitle>
            <AlertDescription>
                {state.result.reason}
            </AlertDescription>
        </Alert>
      )}

      {state.error && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
