
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { sendContactForm } from "@/lib/brevo";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await sendContactForm(formData);
      if (response.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="name" className="text-white font-medium">Name</label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          required 
          className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 backdrop-blur-sm" 
          placeholder="Your name" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-white font-medium">Email</label>
        <Input 
          id="email" 
          name="email" 
          type="email"
          value={formData.email}
          onChange={handleChange}
          required 
          className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 backdrop-blur-sm" 
          placeholder="your@email.com" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-white font-medium">Subject</label>
        <Input 
          id="subject" 
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required 
          className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 backdrop-blur-sm" 
          placeholder="Subject" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-white font-medium">Message</label>
        <Textarea 
          id="message" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          required 
          className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 min-h-[150px] rounded-lg resize-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 backdrop-blur-sm" 
          placeholder="Your message" 
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full text-white border-0 h-12 transition-colors font-medium rounded-lg bg-slate-950 hover:bg-slate-800"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>;
};
