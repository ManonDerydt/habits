import React, { useState } from 'react';
import FormStep from './FormStep';

interface WellbeingFormProps {
  onComplete: () => void;
}

const WellbeingForm: React.FC<WellbeingFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    ideaTitle: '',
    description: '',
    benefits: [] as string[],
    duration: '',
    frequency: '',
    comments: '',
    agreement: false
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Name (optional)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
            >
              <option value="">Select a category</option>
              <option value="micro-habit">Specific micro habit</option>
              <option value="functionality">Application functionality</option>
              <option value="community">Community Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Title of your idea
              </label>
              <input
                type="text"
                value={formData.ideaTitle}
                onChange={(e) => updateFormData('ideaTitle', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
                placeholder="e.g., Morning gratitude exercise"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
                rows={4}
                placeholder="Explain your idea and how it could help mental wellness..."
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => updateFormData('duration', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              >
                <option value="">Select duration</option>
                <option value="less-5">Less than 5 minutes</option>
                <option value="5-10">Between 5 and 10 minutes</option>
                <option value="more-10">More than 10 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => updateFormData('frequency', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Several times a week</option>
                <option value="occasional">Occasionally</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#424242] mb-2">
                Additional comments
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => updateFormData('comments', e.target.value)}
                className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2]"
                rows={4}
                placeholder="Any additional details or suggestions..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreement"
                checked={formData.agreement}
                onChange={(e) => updateFormData('agreement', e.target.checked)}
                className="rounded border-[#B0BEC5] text-[#f8f4b2] focus:ring-[#f8f4b2]"
              />
              <label htmlFor="agreement" className="text-sm text-[#424242]">
                I confirm this idea is original and I authorize its use
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const canProgress = () => {
    switch (currentStep) {
      case 2:
        return !!formData.category;
      case 3:
        return !!formData.ideaTitle && !!formData.description;
      case 4:
        return !!formData.duration && !!formData.frequency;
      case 5:
        return formData.agreement;
      default:
        return true;
    }
  };

  return (
    <FormStep
      title={`Step ${currentStep}`}
      currentStep={currentStep}
      totalSteps={5}
      onNext={handleNext}
      onPrev={handlePrev}
      canProgress={canProgress()}
    >
      {renderStepContent()}
    </FormStep>
  );
};

export default WellbeingForm;