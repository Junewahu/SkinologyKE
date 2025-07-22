import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, User } from "lucide-react";
import acneImage from "@/assets/acne.png";
import lightenImage from "@/assets/lighten.png";
import eczemaImage from "@/assets/eczema.png";
import doctorImage from "@/assets/doctor.png";
import skinHealthImage from "@/assets/skin-health.jpg";
import consultationImage from "@/assets/consultation.jpg";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Acne in African Skin: Myths vs Facts",
      excerpt: "Dispelling common misconceptions about acne treatment for darker skin tones and exploring evidence-based solutions that work.",
      category: "Acne Care",
      readTime: "5 min read",
      author: "Dr. Sarah Kimani",
      date: "2025-07-07",
      image: acneImage,
      featured: true
    },
    {
      id: 2,
      title: "The Dangers of Skin Lightening Creams in Kenya",
      excerpt: "An in-depth look at the health risks associated with unregulated skin lightening products and safer alternatives for even skin tone.",
      category: "Safety Alert",
      readTime: "8 min read", 
      author: "Dr. Michael Wafula",
      date: "2025-12-06",
      image: lightenImage,
      featured: true
    },
    {
      id: 3,
      title: "Eczema vs Fungal Infections: How to Tell the Difference",
      excerpt: "Learn to identify the key differences between eczema and fungal skin infections, especially common in Kenya's climate.",
      category: "Diagnosis",
      readTime: "6 min read",
      author: "Dr. Grace Owino",
      date: "2025-10-05",
      image: eczemaImage,
      featured: false
    },
    {
      id: 4,
      title: "Post-Inflammatory Hyperpigmentation: Treatment Options",
      excerpt: "Comprehensive guide to treating dark spots and discoloration after acne, cuts, or other skin injuries.",
      category: "Hyperpigmentation",
      readTime: "7 min read",
      author: "Dr. Jamie Smith",
      date: "2025-08-04",
      image: doctorImage,
      featured: false
    },
    {
      id: 5,
      title: "Building Your First Skincare Routine on a Budget",
      excerpt: "Essential steps for creating an effective skincare routine using affordable, locally available products.",
      category: "Skincare Basics",
      readTime: "4 min read",
      author: "Dr. Ann Mutiso",
      date: "2025-05-03",
      image: skinHealthImage,
      featured: false
    },
    {
      id: 6,
      title: "Sun Protection for Dark Skin: Why It Matters",
      excerpt: "Understanding UV damage in darker skin tones and choosing the right sunscreen for Kenyan weather conditions.",
      category: "Sun Care",
      readTime: "5 min read",
      author: "Dr. Peter Chepkurui",
      date: "2025-03-02",
      image: consultationImage,
      featured: false
    }
  ];

  const categories = ["All", "Acne Care", "Safety Alert", "Diagnosis", "Hyperpigmentation", "Skincare Basics", "Sun Care"];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Acne Care": "bg-trust text-trust-foreground",
      "Safety Alert": "bg-destructive text-destructive-foreground", 
      "Diagnosis": "bg-primary text-primary-foreground",
      "Hyperpigmentation": "bg-accent text-accent-foreground",
      "Skincare Basics": "bg-secondary text-secondary-foreground",
      "Sun Care": "bg-muted text-muted-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Skin Health Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights on skincare, dermatology, and wellness specifically for African skin. 
            Get evidence-based advice from qualified dermatologists.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group">
                        Read More 
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-primary-light to-secondary p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest dermatology insights, skin care tips, and health updates delivered to your inbox weekly.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}