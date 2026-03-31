
'use client';

import * as React from 'react';
import { z } from 'zod';
import { sendMessage, type SendMessageInput } from '@/actions/send-message'; // Import the server action
import { Send } from 'lucide-react'; // Import Send icon

// Define the form schema using Zod (still useful for validation)
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }).max(500, {
    message: 'Message must not exceed 500 characters.',
  }),
});

type FormErrors = Partial<Record<keyof SendMessageInput, string>>;

export default function ContactForm() {
  const [formData, setFormData] = React.useState<SendMessageInput>({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the specific error when the user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setSubmitStatus(null); // Reset submit status on change
  };

  const validateForm = (): FormErrors => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof SendMessageInput] = err.message;
        }
      });
      return fieldErrors;
    }
    return {};
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitMessage(null);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Don't submit if there are errors
    }

    setIsSubmitting(true);
    try {
      const result = await sendMessage(formData); // Call the server action

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thanks for reaching out. I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'There was a problem sending your message. Please try again later.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`input ${errors.name ? 'border-destructive ring-destructive' : ''}`} // Add error styling
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-destructive">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`input ${errors.email ? 'border-destructive ring-destructive' : ''}`} // Add error styling
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message here..."
          rows={4}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`textarea resize-y min-h-[100px] ${errors.message ? 'border-destructive ring-destructive' : ''}`} // Add error styling and allow vertical resize
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-destructive">{errors.message}</p>}
      </div>

      {/* Submission Status Messages */}
       {submitStatus === 'success' && (
         <div className="p-3 rounded-md bg-primary/10 text-primary border border-primary/30 text-sm">
           {submitMessage}
         </div>
       )}
       {submitStatus === 'error' && (
         <div className="p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/30 text-sm">
           {submitMessage}
         </div>
       )}


      <button type="submit" className="btn btn-primary btn-md w-full md:w-auto" disabled={isSubmitting}>
         {isSubmitting ? 'Sending...' : 'Send Message'}
         {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
      </button>
    </form>
  );
}
