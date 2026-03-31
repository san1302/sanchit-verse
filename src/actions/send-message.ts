
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const CONTACT_EMAIL = 'san@sanchit-verse.com';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set.');
  }
  return new Resend(apiKey);
}

const SendMessageInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100, 'Name too long'),
  email: z.string().email('Invalid email address.').max(100, 'Email too long'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(500, 'Message must not exceed 500 characters.'),
});

export type SendMessageInput = z.infer<typeof SendMessageInputSchema>;

export interface SendMessageOutput {
  success: boolean;
  error?: string;
}

export async function sendMessage(input: SendMessageInput): Promise<SendMessageOutput> {
  try {
    const validated = SendMessageInputSchema.parse(input);

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: 'Sanchit Verse Contact <san@sanchit-verse.com>',
      to: CONTACT_EMAIL,
      replyTo: validated.email,
      subject: `New message from ${validated.name} via sanchit-verse.com`,
      text: [
        `Name: ${validated.name}`,
        `Email: ${validated.email}`,
        '',
        `Message:`,
        validated.message,
      ].join('\n'),
    });

    if (error) {
      return { success: false, error: 'Failed to send message. Please try emailing me directly.' };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validation failed: ${errorMessage}` };
    }

    return { success: false, error: 'Something went wrong. Please try emailing me directly.' };
  }
}
