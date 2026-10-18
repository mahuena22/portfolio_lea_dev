import ServiceDetailClient from './service-detail-client'

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ServiceDetailClient slug={slug} />
}
