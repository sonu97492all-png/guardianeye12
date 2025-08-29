// Social media content filter.
'use server';

/**
 * @fileOverview A social media content filter AI agent.
 *
 * - filterSocialMediaContent - A function that handles the social media content filtering process.
 * - FilterSocialMediaContentInput - The input type for the filterSocialMediaContent function.
 * - FilterSocialMediaContentOutput - The return type for the filterSocialMediaContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterSocialMediaContentInputSchema = z.object({
  content: z.string().describe('The social media content to filter.'),
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords that indicate potentially dangerous content.'
    ),
});
export type FilterSocialMediaContentInput = z.infer<
  typeof FilterSocialMediaContentInputSchema
>;

const FilterSocialMediaContentOutputSchema = z.object({
  isDangerous: z
    .boolean()
    .describe(
      'Whether or not the content is potentially dangerous based on the keywords.'
    ),
  reason: z
    .string()
    .describe(
      'The reason why the content is considered potentially dangerous.'
    ),
});
export type FilterSocialMediaContentOutput = z.infer<
  typeof FilterSocialMediaContentOutputSchema
>;

export async function filterSocialMediaContent(
  input: FilterSocialMediaContentInput
): Promise<FilterSocialMediaContentOutput> {
  return filterSocialMediaContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterSocialMediaContentPrompt',
  input: {schema: FilterSocialMediaContentInputSchema},
  output: {schema: FilterSocialMediaContentOutputSchema},
  prompt: `You are a social media content filter that identifies potentially dangerous content based on predefined keywords.

  Content: {{{content}}}
  Keywords: {{{keywords}}}

  Determine if the content is potentially dangerous based on the keywords. If it is, set isDangerous to true and provide a reason why the content is considered dangerous. If it is not, set isDangerous to false and provide a reason why the content is considered safe.

  Here is the output schema description:
  ${JSON.stringify(FilterSocialMediaContentOutputSchema.shape, null, 2)}`,
});

const filterSocialMediaContentFlow = ai.defineFlow(
  {
    name: 'filterSocialMediaContentFlow',
    inputSchema: FilterSocialMediaContentInputSchema,
    outputSchema: FilterSocialMediaContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
