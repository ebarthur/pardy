import { Container } from "@/components/container";
import { SignInForm } from "@/components/forms/sign-in";

export default function SignInPage() {
  return (
    <main className="h-screen flex items-center">
      <Container>
        <SignInForm />
      </Container>
    </main>
  );
}
