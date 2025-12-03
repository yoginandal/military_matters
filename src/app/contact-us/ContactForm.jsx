"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Card */}
      <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm">
        {/* Name Field */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="name" className="text-slate-300 font-medium">
            Full Name <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50 focus:ring-orange-500/50"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="email" className="text-slate-300 font-medium">
            Email Address <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50 focus:ring-orange-500/50"
          />
        </div>

        {/* Subject Field */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="subject" className="text-slate-300 font-medium">
            Subject <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50 focus:ring-orange-500/50"
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="message" className="text-slate-300 font-medium">
            Message <span className="text-orange-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50 focus:ring-orange-500/50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-base transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </Button>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Message sent successfully! We'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Something went wrong. Please try again later.
          </p>
        </div>
      )}
    </form>
  );
}

