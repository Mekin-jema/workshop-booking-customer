import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
// import WorkshopCarousel from "@/components/workshop-carousel";
import Testimonials from "@/components/testimonials";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master New Skills Through <span className="text-yellow-300">Interactive Workshops</span>
            </h1>
            <p className="text-xl mb-8">
              Join expert-led sessions and transform your knowledge with hands-on learning experiences
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                <Link href="/workshops">Browse Workshops</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Workshops */}
      <section id="featured" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Workshops</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular learning experiences curated by industry experts
          </p>
        </div>
        {/* <WorkshopCarousel workshops={featuredWorkshops} /> */}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>1. Browse Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore our diverse catalog of workshops across various skill levels and topics.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>2. Book Your Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose your preferred time slot and secure your spot with a few clicks.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>3. Learn & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Attend the interactive session and gain practical skills from experts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Skills?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have accelerated their growth with our workshops
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
