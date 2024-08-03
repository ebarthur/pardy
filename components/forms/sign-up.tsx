"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import Submit from "./submit";
import { registerUser } from "@/app/actions/signup.actions";

export function SignUpForm() {
  const [formState, action] = useFormState<{ message: string | null }>(
    registerUser,
    null
  );

  return (
    <Card className="min-w-96 max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Pardy Sign Up</CardTitle>
        <CardDescription>First time? Sign up for the fun</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input required placeholder="statman" name="username" type="text" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>
          {formState?.message && (
            <p className="text-red-500 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {formState.message}
            </p>
          )}
          <div className="flex flex-wrap justify-between">
            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/sign-in"}>
                Already have an account? Sign in now.
              </Link>
            </Button>
          </div>
          <Submit label={"Sign Up"} />
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
