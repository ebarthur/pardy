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
import { login } from "@/app/actions/login.actions";
import { useFormState } from "react-dom";
import Submit from "./submit";

export function SignInForm() {
  const [formState, action] = useFormState<{ message: string | null }>(
    login,
    null
  );

  return (
    <Card className="min-w-96 max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Pardy Log In</CardTitle>
        <CardDescription>
          Log in to your account to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
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
              <Link href={"/sign-up"}>Not signed up? Sign up now.</Link>
            </Button>
          </div>

          <Submit label={"Log In"} />
          <Button variant="outline" className="w-full " asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
