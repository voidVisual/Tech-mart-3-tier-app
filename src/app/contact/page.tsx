"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, RefreshCw } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

function RecaptchaPlaceholder() {
  return (
    <Card className="bg-secondary/50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-2 border-border bg-background w-7 h-7 rounded-sm flex items-center justify-center">
              {/* Fake Checkbox */}
            </div>
            <span className="text-sm text-foreground">I'm not a robot</span>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">reCAPTCHA</span>
            <span className="text-[10px] text-gray-400">Privacy - Terms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-2">We're here to help. Get in touch with our team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How can we help you?" {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RecaptchaPlaceholder />
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
          </Form>
        </div>

        <div className="space-y-8">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>support@techmartindia.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>+91 98765 43210</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold font-headline">Address for Returns</h3>
                     <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                        <address className="not-italic">
                            TechMart India Returns Dept.<br/>
                            123 Electronics Hub, Cyberabad<br/>
                            Hyderabad, Telangana 500081<br/>
                            India
                        </address>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
