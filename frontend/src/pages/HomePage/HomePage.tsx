import { useQuery } from '@tanstack/react-query'
import { servicesApi } from '../../api/services.api'
import { HeroSection } from '../../components/home/HeroSection/HeroSection'
import { HowItWorksSection } from '../../components/home/HowItWorksSection/HowItWorksSection'
import { WhyChooseUsSection } from '../../components/home/WhyChooseUsSection/WhyChooseUsSection'
import { ServicesPreviewSection } from '../../components/home/ServicesPreviewSection/ServicesPreviewSection'
import { TestimonialsSection } from '../../components/home/TestimonialsSection/TestimonialsSection'
import { FaqSection } from '../../components/home/FaqSection/FaqSection'

export function HomePage() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  })

  const featured = services.slice(0, 3)

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <ServicesPreviewSection services={featured} isLoading={isLoading} />
      <TestimonialsSection />
      <FaqSection />
    </div>
  )
}
