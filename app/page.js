import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import DecorativeChart from "./_components/decorative-chart";

export default function LandingPage() {
  return (
    <>
      <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background z-[-1]"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section - Bento Grid */}
      <section id="features" className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Stand Out</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We&apos;ve built a comprehensive suite of tools designed to get you hired faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card */}
            <Card className="md:col-span-2 glass-card border-white/5 hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Trophy className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">ATS-Optimized Resumes</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Stop getting rejected by robots. Our AI builds resumes that pass ATS scans and catch recruiters&apos; eyes.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-white">10x</span>
                      <span className="text-sm text-muted-foreground">More Interviews</span>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-white">AI</span>
                      <span className="text-sm text-muted-foreground">Powered Writing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tall Card */}
            <Card className="glass-card border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
              <CardContent className="p-8 flex flex-col items-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Hyper-Targeted Cover Letters</h3>
                <p className="text-muted-foreground">
                  Generate personalized cover letters that match the exact job description in seconds.
                </p>
              </CardContent>
            </Card>

            {/* Regular Cards */}
            <Card className="glass-card border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Mock Interviews</h3>
                <p className="text-muted-foreground">
                  Practice with our AI interviewer that adapts to your role and experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 glass-card border-white/5 hover:border-green-500/30 transition-all duration-500 group">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Real-time Analytics</h3>
                  <p className="text-muted-foreground">
                    Track your growth, identify weak points, and get actionable insights to improve your interview performance.
                  </p>
                </div>
                <div className="flex-1 w-full h-48 bg-white/5 rounded-xl border border-white/5 overflow-hidden group-hover:border-cyan-500/20 transition-colors shadow-2xl">
                  <DecorativeChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section with Glass Effect */}
      <section className="w-full py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/5 to-purple-500/10 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="glass p-6 rounded-2xl text-center border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">50+</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Industries</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">1k+</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Questions</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">95%</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Success</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center border-white/10 hover:bg-white/5 transition-colors">
              <h3 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">24/7</h3>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">AI Support</p>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
