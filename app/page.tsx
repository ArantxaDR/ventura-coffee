"use client";

import { useState, useCallback } from "react";
import StatusBar from "./components/StatusBar";
import WizardNavigation from "./components/WizardNavigation";
import LoginStep from "./components/steps/LoginStep";
import WaterCheckStep from "./components/steps/WaterCheckStep";
import CapsuleSelectStep from "./components/steps/CapsuleSelectionStep";
import CupVerifyStep from "./components/steps/CupVerifyStep";
import ExtractionStep from "./components/steps/ExtractionStep";
import FinalStep from "./components/steps/FinalStep";
import CompletionStep from "./components/steps/CompletionStep";

type MachineStatus = "off" | "heating" | "ready" | "error";

const Index = () => {
  const [step, setStep] = useState(0); // 0 = login, 1-5 = steps, 6 = completion
  const [machineStatus, setMachineStatus] = useState<MachineStatus>("off");
  const [userName, setUserName] = useState<string | undefined>();
  const [userLevel, setUserLevel] = useState<number | undefined>();

  // Validation states
  const [waterOk, setWaterOk] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<string | null>(null);
  const [selectedCup, setSelectedCup] = useState<string | null>(null);
  const [extractionReady, setExtractionReady] = useState(false);

  const totalSteps = 6;

  const handleLogin = (name: string) => {
    setUserName(name);
    setUserLevel(2);
    setMachineStatus("heating");
    setStep(1);
    setTimeout(() => setMachineStatus("ready"), 3000);
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return waterOk;
      case 2: return selectedCapsule !== null;
      case 3: return selectedCup !== null;
      case 4: return extractionReady;
      default: return true;
    }
  };

  const nextLabel = (): string => {
    if (step === 4) return "Iniciar extracción";
    if (step === 5) return "Completar";
    return "Continuar";
  };

  const handleWaterValidated = useCallback((valid: boolean) => setWaterOk(valid), []);
  const handleCapsuleSelect = useCallback((cap: string | null) => setSelectedCapsule(cap), []);
  const handleCupSelect = useCallback((cup: string | null) => setSelectedCup(cup), []);
  const handleExtractionReady = useCallback((ready: boolean) => setExtractionReady(ready), []);

  const handleNext = useCallback(() => {
    if (canProceed()) {
      setStep((s) => Math.min(6, s + 1));
    }
  }, [canProceed]);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {step > 0 && (
        <StatusBar
          status={machineStatus}
          userName={userName}
          userLevel={userLevel}
          currentStep={step}
          totalSteps={totalSteps}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {step === 0 && <LoginStep onLogin={handleLogin} />}
        {step === 1 && <WaterCheckStep onValidated={handleWaterValidated} />}
        {step === 2 && <CapsuleSelectStep onSelect={handleCapsuleSelect} />}
        {step === 3 && <CupVerifyStep onSelect={handleCupSelect} />}
        {step === 4 && <ExtractionStep capsuleType={selectedCapsule} onReady={handleExtractionReady} />}
        {step === 5 && <FinalStep />}
        {step === 6 && <CompletionStep onRestart={() => setStep(0)} />}
      </div>

      {step > 0 && step < 6 && (
        <WizardNavigation
          showBack={step > 1}
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={!canProceed()}
          nextLabel={nextLabel()}
          isLastStep={step === 5}
        />
      )}
    </div>
  );
};

export default Index;
