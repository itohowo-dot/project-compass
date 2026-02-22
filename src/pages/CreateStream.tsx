import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "@/components/create-stream/StepIndicator";
import { StepRecipient } from "@/components/create-stream/StepRecipient";
import { StepAmount } from "@/components/create-stream/StepAmount";
import { StepDuration } from "@/components/create-stream/StepDuration";
import { StepReview } from "@/components/create-stream/StepReview";
import { StepSuccess } from "@/components/create-stream/StepSuccess";
import { createStreamSchema, recipientSchema, amountSchema, durationSchema, type CreateStreamFormValues } from "@/lib/create-stream-schema";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Confetti } from "@/components/Confetti";

const stepVariants = {
  enter: (direction: number) => ({ x: direction * 50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -50, opacity: 0 }),
};

const stepSchemas = [recipientSchema, amountSchema, durationSchema];

export default function CreateStream() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stepError, setStepError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CreateStreamFormValues>({
    resolver: zodResolver(createStreamSchema),
    defaultValues: { recipientAddress: "", amount: undefined as unknown as number, durationDays: undefined as unknown as number },
    mode: "onTouched",
  });

  const goNext = async () => {
    const schema = stepSchemas[step - 1];
    const values = form.getValues();
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        form.setError(issue.path[0] as keyof CreateStreamFormValues, { message: issue.message });
      });
      setStepError("Please fix the errors below before continuing.");
      return;
    }
    setStepError("");
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast({ title: "Stream Created! 🎉", description: "Your payment stream is now active." });
    setIsSubmitting(false);
    setShowConfetti(true);
    setDirection(1);
    setStep(5);
  };

  const stepContent = () => {
    switch (step) {
      case 1: return <StepRecipient form={form} />;
      case 2: return <StepAmount form={form} />;
      case 3: return <StepDuration form={form} />;
      case 4: return <StepReview form={form} isSubmitting={isSubmitting} onConfirmSubmit={form.handleSubmit(onSubmit)} />;
      case 5: return <StepSuccess form={form} />;
    }
  };

  return (
    <DashboardLayout>
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <div className="max-w-lg mx-auto">
        {step < 5 && <StepIndicator currentStep={step} />}

        <Card className="gradient-card border-border/50">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div aria-live="assertive" className="sr-only">
                  {stepError}
                </div>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {stepContent()}
                  </motion.div>
                </AnimatePresence>

                {step < 4 && step < 5 && (
                  <div className="flex items-center justify-between mt-8">
                    <Button type="button" variant="ghost" onClick={() => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); }} disabled={step === 1}>
                      <ArrowLeft className="h-4 w-4 mr-1" />Back
                    </Button>
                    <Button type="button" onClick={goNext}>
                      Continue<ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
