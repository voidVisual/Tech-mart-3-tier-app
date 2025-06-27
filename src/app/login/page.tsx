
"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loginAction } from "../actions";

const initialState = {
  type: '',
  message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? 'Logging In...' : 'Log In'}
        </Button>
    )
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.type === 'error') {
      toast({
        title: "Login Failed",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);


  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm underline hover:text-primary">
                    Forgot password?
                    </Link>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {state.type === 'error' && (
                 <p className="text-sm font-medium text-destructive">{state.message}</p>
            )}
            <SubmitButton />
          </form>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
