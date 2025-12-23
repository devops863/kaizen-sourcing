import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function Steps({ currentStep, totalSteps, labels }: StepsProps) {
  return (
    <div className="w-full mb-8">
      {/* Progress Bar Background */}
      <div className="relative h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((currentStep) / (totalSteps)) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      {labels && (
        <div className="hidden md:flex justify-between items-start px-2">
          {labels.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            
            return (
              <div key={index} className="flex flex-col items-center relative w-32 group">
                <div 
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 transition-all duration-300 font-bold text-sm",
                    isCompleted ? "bg-primary border-primary text-white" :
                    isCurrent ? "bg-white border-primary text-primary shadow-lg scale-110" :
                    "bg-white border-gray-200 text-gray-400"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span className={cn(
                  "text-xs text-center font-medium transition-colors duration-300",
                  isCurrent ? "text-primary" : "text-gray-500"
                )}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Mobile Text Indicator */}
      <div className="md:hidden flex justify-between items-center text-sm font-medium text-gray-600">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-primary">{labels?.[currentStep - 1]}</span>
      </div>
    </div>
  );
}
