import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Camera, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-diagnosis.jpg";

export default function Diagnosis() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { toast } = useToast();

  const symptomOptions = [
    "Itching or burning",
    "Redness or inflammation", 
    "Dry or flaky skin",
    "Dark spots or discoloration",
    "Raised bumps or lesions",
    "Pain or tenderness",
    "Scaling or peeling",
    "Swelling"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, symptom]);
    } else {
      setSymptoms(symptoms.filter(s => s !== symptom));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || symptoms.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and select at least one symptom.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your skin condition has been analyzed. Please consult with a dermatologist for proper treatment.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary-light overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Skin Diagnosis" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI Skin Diagnosis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant AI-powered analysis of your skin condition. Upload a clear photo and describe your symptoms for personalized recommendations.
          </p>
        </div>
      </section>

      {/* Diagnosis Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Upload */}
            <Card className="h-fit shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Upload Skin Photo
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected area in good lighting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-48 object-contain mx-auto rounded-lg"
                        />
                        <Button variant="outline" onClick={() => {
                          setSelectedImage(null);
                          setImagePreview("");
                        }}>
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      {!imagePreview && (
                        <Button variant="secondary" className="mt-2">
                          Choose File
                        </Button>
                      )}
                    </Label>
                  </div>

                  <div className="bg-accent/30 p-4 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-accent-foreground">Photo Tips:</p>
                        <ul className="text-accent-foreground/80 mt-1 space-y-1">
                          <li>• Use natural lighting</li>
                          <li>• Keep camera steady</li>
                          <li>• Fill the frame with affected area</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Symptoms Form */}
            <Card className="h-fit shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Describe Symptoms
                </CardTitle>
                <CardDescription>
                  Select all symptoms you're experiencing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {symptomOptions.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={symptoms.includes(symptom)}
                        onCheckedChange={(checked) => 
                          handleSymptomChange(symptom, checked as boolean)
                        }
                      />
                      <Label htmlFor={symptom} className="text-sm cursor-pointer">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any other details about when symptoms started, triggers, or previous treatments..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !selectedImage || symptoms.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Skin Condition"
                  )}
                </Button>

                <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                  <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult a qualified dermatologist for proper diagnosis and treatment.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}