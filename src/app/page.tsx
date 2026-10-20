"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedLoopBanner from "@/components/CurvedLoopBanner";
import PlansSection from "@/components/PlansSection";
import ProjectViewer from "@/components/ProjectViewer";
import TechStackSection from "@/components/TechStackSection";
import ProcessSection from "@/components/ProcessSection";
import ContactFunnel from "@/components/ContactFunnel";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import QuickStartModal from "@/components/QuickStartModal";
import { DEVELOPMENT_PLANS, DevelopmentPlan } from "@/constants/plans";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<DevelopmentPlan>(DEVELOPMENT_PLANS[2]); // Default E-commerce
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // When a plan is chosen on any card
  const handleSelectPlan = (plan: DevelopmentPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Open modal from Navbar CTA
  const handleOpenContactModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F4F2EB] text-[#141534] selection:bg-[#D5DD54] selection:text-[#141534]">
      {/* Floating Modern Navbar */}
      <Navbar onOpenContactModal={handleOpenContactModal} />

      {/* Hero Section */}
      <Hero />

      {/* Panoramic Interactive Curved Loop (React Bits) */}
      <CurvedLoopBanner />

      {/* Section B: Plans & Services (Strictly No Prices!) */}
      <PlansSection onSelectPlan={handleSelectPlan} />

      {/* Section C: Interactive Live Project Showcase */}
      <ProjectViewer />

      {/* Tech Stack & Architecture Ecosystem */}
      <TechStackSection />

      {/* 4-Step Engineering Delivery Process */}
      <ProcessSection />

      {/* Section D: Direct Closing Funnel / WhatsApp Generator */}
      <ContactFunnel
        selectedPlan={selectedPlan}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
      />

      {/* FAQ & Reassurance */}
      <FaqSection />

      {/* Modern Footer */}
      <Footer />

      {/* Quick Start Modal Dialog */}
      <QuickStartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
      />
    </main>
  );
}
