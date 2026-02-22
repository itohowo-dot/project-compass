import { Check } from "lucide-react";

const steps = ["Recipient", "Amount", "Duration", "Review"];

interface Props {
  currentStep: number;
}

export function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between mb-8 gap-1 sm:gap-0">
      {steps.map((label, i) => {
        const step = i + 1;
        const isComplete = step < currentStep;
        const isCurrent = step === currentStep;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  isComplete
                    ? "gradient-primary text-primary-foreground"
                    : isCurrent
                    ? "border-2 border-primary text-primary"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : step}
              </div>
              <span className={`text-[10px] sm:text-xs ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${isComplete ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
