import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormStepProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  canProgress?: boolean;
  children: React.ReactNode;
}

const FormStep = ({
  title,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  canProgress = true,
  children,
}: FormStepProps) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div className="h-2 bg-[#F5F5F5] rounded-full">
          <div
            className="h-2 bg-[#f8f4b2] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-[#B0BEC5] text-sm mt-2">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#424242] mb-6">{title}</h2>
        {children}
      </div>

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={onPrev}
            className="flex items-center px-4 py-2 text-[#424242] hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>
        )}
        
        {currentStep < totalSteps ? (
          <button
            onClick={onNext}
            disabled={!canProgress}
            className="flex items-center px-6 py-2 bg-[#f8f4b2] text-[#424242] rounded-lg hover:bg-[#e8e4a2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canProgress}
            className="flex items-center px-6 py-2 bg-[#f8f4b2] text-[#424242] rounded-lg hover:bg-[#e8e4a2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default FormStep;