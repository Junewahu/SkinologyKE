import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
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
import { Carousel } from "@/components/ui/carousel";
// import { diagnoseSkin } from "@/api/diagnosis";
import { db } from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";


export default function Diagnosis() {
  // Firebase Analytics
  useEffect(() => {
    try {
      const analytics = getAnalytics();
      logEvent(analytics, "page_view", { page: "diagnosis" });
    } catch (e) {
      // Analytics not initialized or not supported
    }
  }, []);
  // Firebase Auth state
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      toast({ title: "Login failed", description: "Could not sign in.", variant: "destructive" });
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      toast({ title: "Logout failed", description: "Could not sign out.", variant: "destructive" });
    }
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [result, setResult] = useState<null | {
    diagnosis: string;
    confidence: number;
    routine: string;
  }>(null);
  const [galleryUploads, setGalleryUploads] = useState<Array<{
    url: string;
    caption: string;
    tag?: string;
    consent: boolean;
    approved: boolean;
    user?: { uid: string; email: string | null };
  }>>([]);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryConsent, setGalleryConsent] = useState(false);
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

  // Real AI diagnosis: POST image and symptoms to Flask API
  // Limit to 2 free scans/month (localStorage-based MVP quota)
  const getScanCount = () => {
    const data = localStorage.getItem("skinology_scan_count");
    if (!data) return 0;
    const { count, month } = JSON.parse(data);
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
    return month === thisMonth ? count : 0;
  };

  const incrementScanCount = () => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;
    const data = localStorage.getItem("skinology_scan_count");
    let count = 0;
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.month === thisMonth) count = parsed.count;
    }
    localStorage.setItem("skinology_scan_count", JSON.stringify({ count: count + 1, month: thisMonth }));
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
    // Enforce scan limit
    if (getScanCount() >= 2) {
      toast({
        title: "Scan Limit Reached",
        description: "You have reached your free scan limit for this month. Please subscribe for more scans.",
        variant: "destructive",
      });
      return;
    }
    setIsAnalyzing(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("symptoms", JSON.stringify(symptoms));
      formData.append("additionalInfo", additionalInfo);
      // Replace with your Flask API endpoint
      const response = await fetch("https://your-flask-api-url/diagnose", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      const res = await response.json();
      setResult({
        diagnosis: res.diagnosis,
        confidence: Math.round(res.confidence * 100),
        routine: Array.isArray(res.routine) ? res.routine.join(", ") : res.routine
      });
      incrementScanCount();
      toast({
        title: "Analysis Complete",
        description: "Your skin condition has been analyzed. Please consult with a dermatologist for proper treatment.",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again later.",
        variant: "destructive",
      });
    }
    setIsAnalyzing(false);
  };

  // Fetch approved gallery uploads from Firestore
  useEffect(() => {
    async function fetchGallery() {
      const q = query(collection(db, "gallery"), where("approved", "==", true));
      const snapshot = await getDocs(q);
      setGalleryUploads(snapshot.docs.map(doc => doc.data() as any));
    }
    fetchGallery();
  }, []);

  // Upload gallery image to Firebase Storage and Firestore, with tag support
  const [galleryTag, setGalleryTag] = useState("");
  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!user) {
      toast({ title: "Login required", description: "Please sign in to upload.", variant: "destructive" });
      return;
    }
    if (file && galleryConsent) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `gallery/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        await addDoc(collection(db, "gallery"), {
          url,
          caption: galleryCaption,
          tag: galleryTag,
          consent: true,
          approved: false,
          user: { uid: user.uid, email: user.email }
        });
        setGalleryUploads([...galleryUploads, { url, caption: galleryCaption, tag: galleryTag, consent: true, approved: false }]);
        try {
          const analytics = getAnalytics();
          logEvent(analytics, "gallery_upload", { user: user.email, tag: galleryTag });
        } catch (e) {}
        setGalleryCaption("");
        setGalleryTag("");
        setGalleryConsent(false);
        toast({ title: "Upload submitted for moderation." });
      } catch (e) {
        toast({ title: "Upload failed", description: "Please try again later.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col min-h-screen">
      {/* Deployment/CI Banner */}
      <div className="w-full bg-blue-50 border-b border-blue-200 py-2 flex items-center justify-center text-xs text-blue-800">
        <span className="mr-2">🚀 Deployed: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">Vercel</a></span>
        <span className="mx-2">|</span>
        <a href="/docs/deploy.md" className="underline">Deployment Docs</a>
        <span className="mx-2">|</span>
        <img src="https://img.shields.io/github/actions/workflow/status/Junewahu/SkinologyKE/deploy.yml?branch=main" alt="CI Status" className="inline h-4 align-middle" />
      </div>
      {/* Branding Header */}
      <header className="w-full flex items-center justify-center py-4 bg-white/80 border-b border-border shadow-sm relative">
        <img src="/src/assets/logo.png" alt="SkinologyKE Logo" className="h-10 w-10 mr-3 rounded-full shadow" />
        <span className="text-2xl font-bold tracking-tight text-primary">SkinologyKE</span>
        <span className="ml-3 text-xs text-muted-foreground font-medium">AI for Healthy Skin</span>
        <a href="/docs/user_flows.md" target="_blank" rel="noopener noreferrer" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition">Help &amp; Docs</a>
      </header>
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

      {/* Quickstart Card */}
      <section className="max-w-2xl mx-auto px-4 -mt-12 z-10 relative">
        <div className="bg-white/90 border border-border rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 text-left">
            <div className="font-semibold text-lg mb-1">Quickstart Guide</div>
            <ol className="list-decimal ml-5 text-sm text-muted-foreground">
              <li>Sign in with Google to unlock all features.</li>
              <li>Upload a clear skin photo and select your symptoms.</li>
              <li>Get instant AI analysis and a suggested routine.</li>
              <li>Share your progress in the Before &amp; After Gallery.</li>
              <li>Need help? Click the Help &amp; Docs button above.</li>
            </ol>
          </div>
          <div className="flex-shrink-0">
            <a href="/docs/user_flows.md" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">View Full Docs</a>
          </div>
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

        {/* Result Section */}
        {result && (
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="text-primary">Diagnosis Result</CardTitle>
                <CardDescription>
                  <span className="font-semibold">Condition:</span> {result.diagnosis}<br />
                  <span className="font-semibold">Confidence:</span> {result.confidence}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="font-semibold">Suggested Routine:</span>
                  <div className="mt-2 text-muted-foreground">{result.routine}</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://wa.me/254700000000?text=Hi%20SkinologyKE%2C%20I%20need%20a%20dermatologist%20referral%20for%20'+encodeURIComponent(result.diagnosis), '_blank')}
                >
                  See Dermatologist (WhatsApp)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Before/After Carousel + Auth UI */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Before & After Gallery</h2>
          {/* Auth UI */}
          <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Signed in as {user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>Sign in with Google to Upload</Button>
            )}
          </div>
          <form className="mb-8 flex flex-col md:flex-row gap-2 items-center justify-center" onSubmit={e => {e.preventDefault();}} aria-label="Before and After Gallery Upload">
            <input type="file" accept="image/*" onChange={handleGalleryUpload} aria-label="Upload before/after image" disabled={!user} />
            <input type="text" placeholder="Caption (e.g. Acne after 3 months)" value={galleryCaption} onChange={e => setGalleryCaption(e.target.value)} className="border rounded px-2 py-1" aria-label="Image caption" disabled={!user} />
            <select value={galleryTag} onChange={e => setGalleryTag(e.target.value)} className="border rounded px-2 py-1" aria-label="Image tag" disabled={!user}>
              <option value="">Tag (optional)</option>
              <option value="Acne">Acne</option>
              <option value="PIH">PIH</option>
              <option value="Eczema">Eczema</option>
              <option value="Other">Other</option>
            </select>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={galleryConsent} onChange={e => setGalleryConsent(e.target.checked)} aria-label="Consent to public sharing" disabled={!user} />
              I consent to public sharing and moderation
            </label>
            <Button type="submit" disabled={!galleryConsent || !user}>Upload</Button>
          </form>
          {/* Ad slot for local business */}
          <div className="mb-4 text-center" aria-label="Ad slot">
            <span className="text-xs text-muted-foreground">[Ad: Your business here]</span>
          </div>
          <Carousel>
            {galleryUploads.map((img, idx) => (
              <div key={idx}>
                <img src={img.url} alt={img.caption} className="w-full rounded-lg" />
                <div className="text-center mt-2 text-sm">
                  {img.caption} {img.tag && <span className="ml-2 text-xs bg-accent px-2 py-0.5 rounded">{img.tag}</span>}
                  {typeof img.approved !== 'undefined' && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${img.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {img.approved ? 'Approved' : 'Pending Moderation'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      {/* Feedback Form Stub */}
      <section className="py-8 px-4">
        <div className="max-w-xl mx-auto">
          <h3 className="text-lg font-bold mb-2">Feedback</h3>
          <form onSubmit={e => {e.preventDefault(); /* TODO: Implement feedback submission */}} aria-label="Feedback Form">
            <textarea className="w-full border rounded p-2 mb-2" placeholder="Your feedback..." aria-label="Feedback input" />
            <Button type="submit">Submit Feedback</Button>
          </form>
        </div>
      </section>
      {/* Footer Branding */}
      <footer className="w-full mt-12 py-6 bg-muted/60 border-t border-border text-center text-xs text-muted-foreground">
        <div className="mb-2">&copy; {new Date().getFullYear()} SkinologyKE. All rights reserved.</div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://github.com/Junewahu/SkinologyKE" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://twitter.com/skinologyke" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          <a href="mailto:info@skinology.ke" className="hover:underline">Contact</a>
        </div>
        <div className="italic">Empowering Africa's skin health with AI &amp; community</div>
      </footer>
    </div>
  );
}