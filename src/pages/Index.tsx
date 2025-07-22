import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, BookOpen, Users, Shield, Star, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-diagnosis.jpg";
import skinHealthImage from "@/assets/skin-health.jpg";
import consultationImage from "@/assets/consultation.jpg";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Skin Analysis",
      description: "Advanced AI technology trained on diverse skin types for accurate condition assessment."
    },
    {
      icon: Users,
      title: "Expert Dermatologists",
      description: "Connect with qualified dermatologists specializing in African skin conditions."
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Evidence-based articles and guides for proper skincare and treatment."
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your health information is encrypted and handled with complete confidentiality."
    }
  ];

  const testimonials = [
    {
      name: "Mary Wanjiku",
      location: "Nairobi",
      rating: 5,
      text: "SkinologyKE helped me identify my skin condition quickly. The AI diagnosis was spot-on and connected me with a great dermatologist."
    },
    {
      name: "James Kimani", 
      location: "Mombasa",
      rating: 5,
      text: "Finally, skincare advice that actually works for my skin tone. The blog articles are incredibly helpful and scientifically accurate."
    },
    {
      name: "Grace Njeri",
      location: "Kisumu", 
      rating: 5,
      text: "The AI diagnosis saved me time and money. I got the right treatment faster than ever before."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-primary-light"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
                    AI Meets
                  </span>
                  <br />
                  African Skin
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Get instant, accurate skin condition diagnosis powered by AI trained specifically for diverse African skin tones.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/diagnose">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    <Camera className="w-5 h-5 mr-2" />
                    Start Diagnosis
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-1" />
                  <span>AI Trained on African Skin</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-1" />
                  <span>Expert Dermatologists</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-trust/20 rounded-3xl blur-2xl"></div>
              <img 
                src={heroImage}
                alt="AI Skin Diagnosis Technology"
                className="relative rounded-3xl shadow-[var(--shadow-soft)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose SkinologyKE?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The first AI-powered dermatology platform designed specifically for African skin conditions and care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-trust rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get your skin diagnosis in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-trust rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Upload Photo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Take a clear photo of your skin condition in good lighting and upload it securely.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Describe Symptoms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select your symptoms and provide additional context about your skin condition.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-trust to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Get Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive AI-powered analysis and personalized recommendations from our experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-secondary to-primary-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by thousands across Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-[var(--shadow-card)]">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="font-semibold">
                    {testimonial.name}
                    <div className="text-sm text-muted-foreground font-normal">
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of Kenyans who trust SkinologyKE for their skin health needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/diagnose">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Free Diagnosis
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Contact Dermatologist
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              No account required • Completely confidential • Instant results
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-trust rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="font-bold text-xl">SkinologyKE</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered dermatology for African skin conditions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/diagnose" className="hover:text-foreground">AI Diagnosis</Link></li>
                <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><a href="#" className="hover:text-foreground">Dermatologist Referral</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">WhatsApp</a></li>
                <li><a href="#" className="hover:text-foreground">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SkinologyKE. All rights reserved. Made with care for African skin health.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
