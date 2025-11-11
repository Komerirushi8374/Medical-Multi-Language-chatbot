import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Stethoscope } from "lucide-react";
import { symptomsTranslations } from "@/lib/symptomsTranslations";

interface SymptomsCheckerProps {
  onSymptomsSubmit: (symptoms: string[]) => void;
  language: string;
}

const commonSymptomsKeys = [
  "Fever",
  "Cough",
  "Headache",
  "Sore throat",
  "Runny nose",
  "Body aches",
  "Fatigue",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Dizziness",
  "Chest pain",
  "Shortness of breath",
  "Abdominal pain",
  "Back pain",
  "Skin rash",
  "Loss of appetite",
  "Difficulty sleeping"
];

export const SymptomsChecker = ({ onSymptomsSubmit, language }: SymptomsCheckerProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const translations = symptomsTranslations[language] || symptomsTranslations.english;

  const toggleSymptom = (symptomKey: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomKey)
        ? prev.filter(s => s !== symptomKey)
        : [...prev, symptomKey]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      const translatedSymptoms = selectedSymptoms.map(key => translations[key]);
      onSymptomsSubmit(translatedSymptoms);
      setSelectedSymptoms([]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          <CardTitle>Symptoms Checker</CardTitle>
        </div>
        <CardDescription>
          Select your symptoms to get relevant health information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[280px] w-full rounded-md border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonSymptomsKeys.map((symptomKey) => (
              <div key={symptomKey} className="flex items-center space-x-2">
                <Checkbox
                  id={symptomKey}
                  checked={selectedSymptoms.includes(symptomKey)}
                  onCheckedChange={() => toggleSymptom(symptomKey)}
                />
                <label
                  htmlFor={symptomKey}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {translations[symptomKey]}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedSymptoms.length > 0 && (
          <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
            <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Selected symptoms:</p>
              <p className="text-muted-foreground">
                {selectedSymptoms.map(key => translations[key]).join(", ")}
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={selectedSymptoms.length === 0}
          className="w-full"
        >
          Get Health Information
        </Button>
      </CardContent>
    </Card>
  );
};
