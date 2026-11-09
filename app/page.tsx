import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { Philosophy } from '@/components/landing/philosophy'
import { Collection } from '@/components/landing/collection'
import { CatalogBrowser } from '@/components/landing/catalog-browser'
import { GrandOpening } from '@/components/landing/grand-opening'
import { Lifestyle } from '@/components/landing/lifestyle'
import { CtaBand } from '@/components/landing/cta-band'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Philosophy />
        <Collection />
        <CatalogBrowser />
        <GrandOpening />
        <Lifestyle />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
