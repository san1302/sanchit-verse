
'use server';

/**
 * @fileOverview Server action for handling contact form submissions.
 *
 * - sendMessage - A function that processes the contact form data.
 * - SendMessageInput - The input type for the sendMessage function.
 * - SendMessageOutput - The return type for the sendMessage function.
 */

import { z } from 'zod';

// Define the input schema for the contact form
const SendMessageInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100, 'Name too long'),
  email: z.string().email('Invalid email address.').max(100, 'Email too long'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(500, 'Message must not exceed 500 characters.'),
});

export type SendMessageInput = z.infer<typeof SendMessageInputSchema>;

// Define the output schema for the server action
const SendMessageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(), // Optional error message
});

export type SendMessageOutput = z.infer<typeof SendMessageOutputSchema>;

/**
 * Processes the contact form submission.
 * Placeholder implementation: Logs the data and returns success.
 * Replace with actual email sending or database saving logic.
 *
 * @param input - The validated contact form data.
 * @returns An object indicating success or failure.
 */
export async function sendMessage(input: SendMessageInput): Promise<SendMessageOutput> {
  try {
    // Validate input using Zod schema (react-hook-form already does this, but good practice for server actions)
    const validatedInput = SendMessageInputSchema.parse(input);

    // ** Placeholder Logic **
    // In a real application, you would:
    // 1. Use an email service (like Resend, SendGrid, etc.) to send an email notification.
    // 2. Or, save the message to a database (e.g., Firestore).
    // 3. Implement proper error handling for the external service call.

    // Simulate asynchronous operation (e.g., sending email)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Assume success for now
    return { success: true };

  } catch (error) {
    // Handle potential Zod validation errors or other exceptions
    if (error instanceof z.ZodError) {
      // Combine multiple validation errors into a single message if needed
       const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validation failed: ${errorMessage}` };
    }

    return { success: false, error: 'An unexpected error occurred while sending the message.' };
  }
}
