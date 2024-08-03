import { Container } from "@/components/container";
import { SignUpForm } from "@/components/forms/sign-up";

export default function SignUpPage() {
  return (
    <main className="h-screen flex items-center">
      <Container>
        <SignUpForm />
      </Container>
    </main>
  );
}
