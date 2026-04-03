import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutPreview from "@/components/home/AboutPreview";
import AdmissionBanner from "@/components/home/AdmissionBanner";
import AchievementsPreview from "@/components/home/AchievementsPreview";
import NewsPreview from "@/components/home/NewsPreview";
import SchoolFinderPreview from "@/components/home/SchoolFinderPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SchoolFinderPreview />
      <AboutPreview />
      <StatsSection />
      <AchievementsPreview />
      <NewsPreview />
      <AdmissionBanner />
    </>
  );
}
