
'use client';

import * as React from 'react';
import { z } from 'zod';
import { sendMessage, type SendMessageInput } from '@/actions/send-message';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not exceed 500 characters.' }),
});

type FormErrors = Partial<Record<keyof SendMessageInput, string>>;

export default function ContactForm() {
  const [formData, setFormData] = React.useState<SendMessageInput>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setSubmitStatus(null);
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
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendMessage(formData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thanks for reaching out! I'll get back within a day.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full bg-[#1F1F24] rounded-[12px] px-6 py-4 text-white placeholder:text-stone-600 border border-[#5c403c26] transition-all outline-none focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)]';

  return (
    <form onSubmit={handleSubmit} action="#" method="POST" className="flex flex-col gap-4 max-w-[500px] mx-auto">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          aria-required="true"
          aria-invalid={!!errors.name}
          className={`${inputBase} ${errors.name ? 'border-[#DC2626]' : ''}`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-[#DC2626] font-body">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          aria-required="true"
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? 'border-[#DC2626]' : ''}`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-[#DC2626] font-body">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write a message here..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? 'border-[#DC2626]' : ''}`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-[#DC2626] font-body">{errors.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 rounded-[12px] bg-green-500/10 text-green-400 border border-green-500/20 text-sm text-center font-body">
          {submitMessage}
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 rounded-[12px] bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 text-sm text-center font-body">
          {submitMessage}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-white text-black font-bold font-body py-4 rounded-full mt-4 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>

      <p className="text-center text-[#C6C6C7] text-xs mt-2 opacity-60 font-body">
        Your info stays private.
      </p>
    </form>
  );
}
