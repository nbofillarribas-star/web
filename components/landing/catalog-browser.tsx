'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  CATEGORIES_DATA,
  Category,
  Product
} from '@/lib/products-data'
import {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  Keyboard,
  Monitor,
  HardDrive,
  Camera,
  Home,
  BatteryCharging,
  Search,
  SlidersHorizontal,
  X,
  Star,
  Check,
  ArrowRight,
  ShieldCheck,
  Eye,
  Sliders,
  Sparkles,
  Crown,
  Maximize2,
  Minimize2,
  Wrench,
  Radio,
  Wifi,
  Sun,
  Moon,
  Zap,
  Tag,
  Grid,
  Columns,
  Cpu,
  Move,
  Server,
  Lock,
  Volume2,
  Briefcase,
  Layers,
  Filter,
  CheckCircle2,
  ShoppingCart,
  RotateCcw
} from 'lucide-react'

// Icon mapping helper
const ICONS_MAP: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  Keyboard,
  Monitor,
  HardDrive,
  Camera,
  Home,
  BatteryCharging,
  ShieldCheck,
  Eye,
  Sliders,
  Sparkles,
  Crown,
  Maximize2,
  Minimize2,
  Wrench,
  Radio,
  Wifi,
  Sun,
  Moon,
  Zap,
  Tag,
  Grid,
  Columns,
  Cpu,
  Move,
  Server,
  Lock,
  Volume2,
  Briefcase,
  Layers
}

// Flat list of all 150 products with category reference
interface EnrichedProduct extends Product {
  categoryId: string
  categoryName: string
  categoryShortName: string
}

export function CatalogBrowser() {
  // 'all' represents viewing all 10 categories (150 products) or a specific category id
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null)
  const [priceSort, setPriceSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock'>('featured')
  
  // Secondary facet filters
  const [priceRangeFilter, setPriceRangeFilter] = useState<'all' | 'under100' | '100to500' | '500to1000' | 'over1000'>('all')
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'special-editions' | 'in-stock'>('all')

  // Cart & notifications
  const [cartItems, setCartItems] = useState<{ product: EnrichedProduct; addedAt: number }[]>([])
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement>(null)

  // Listen to hash change if user clicked a link with #catalogo or specific category
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#cat-')) {
        const catId = hash.replace('#cat-', '')
        const exists = CATEGORIES_DATA.some((c) => c.id === catId)
        if (exists) {
          setSelectedCategoryId(catId)
        }
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // All 150 products enriched
  const allEnrichedProducts: EnrichedProduct[] = useMemo(() => {
    return CATEGORIES_DATA.flatMap((category) =>
      category.products.map((p) => ({
        ...p,
        categoryId: category.id,
        categoryName: category.name,
        categoryShortName: category.shortName
      }))
    )
  }, [])

  // Currently selected category object (or undefined if 'all')
  const currentCategory = useMemo(() => {
    if (selectedCategoryId === 'all') return null
    return CATEGORIES_DATA.find((c) => c.id === selectedCategoryId) || null
  }, [selectedCategoryId])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    // 1. Filter by category
    let list = selectedCategoryId === 'all'
      ? allEnrichedProducts
      : allEnrichedProducts.filter((p) => p.categoryId === selectedCategoryId)

    // 2. Filter by search query (name, tagline, description, specs, category)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.categoryShortName.toLowerCase().includes(q) ||
        p.specs.some((spec) => spec.toLowerCase().includes(q))
      )
    }

    // 3. Filter by price range
    if (priceRangeFilter === 'under100') {
      list = list.filter((p) => p.price < 100)
    } else if (priceRangeFilter === '100to500') {
      list = list.filter((p) => p.price >= 100 && p.price <= 500)
    } else if (priceRangeFilter === '500to1000') {
      list = list.filter((p) => p.price > 500 && p.price <= 1000)
    } else if (priceRangeFilter === 'over1000') {
      list = list.filter((p) => p.price > 1000)
    }

    // 4. Filter by badges / availability
    if (badgeFilter === 'special-editions') {
      list = list.filter((p) => Boolean(p.badge))
    } else if (badgeFilter === 'in-stock') {
      list = list.filter((p) => p.stock > 5)
    }

    // 5. Sorting
    if (priceSort === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price)
    }
    if (priceSort === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price)
    }
    if (priceSort === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
    }
    if (priceSort === 'stock') {
      return [...list].sort((a, b) => b.stock - a.stock)
    }

    return list
  }, [allEnrichedProducts, selectedCategoryId, searchQuery, priceRangeFilter, badgeFilter, priceSort])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    // Keep user's search or clear if switching with different intent
  }

  const handleResetFilters = () => {
    setSelectedCategoryId('all')
    setSearchQuery('')
    setPriceRangeFilter('all')
    setBadgeFilter('all')
    setPriceSort('featured')
  }

  const handleAddToCart = (product: EnrichedProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCartItems((prev) => [...prev, { product, addedAt: Date.now() }])
    setAddedProductId(product.id)
    setToastMessage(`"${product.name}" añadido a la reserva del 15 de octubre`)
    setTimeout(() => {
      setAddedProductId(null)
      setToastMessage(null)
    }, 2800)
  }

  const CurrentIcon = currentCategory ? (ICONS_MAP[currentCategory.iconName] || Laptop) : Layers

  const hasActiveFilters =
    selectedCategoryId !== 'all' ||
    searchQuery.trim() !== '' ||
    priceRangeFilter !== 'all' ||
    badgeFilter !== 'all' ||
    priceSort !== 'featured'

  return (
    <section ref={sectionRef} id="catalogo" className="scroll-mt-10 border-t border-border/70 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="size-3" /> Catálogo Interactivo · Tecnología Minoritaria de Autor
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-espresso md:text-5xl lg:text-6xl">
              10 Categorías, 150 Dispositivos de Vanguardia.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Haz clic en cualquiera de las <strong>10 categorías temáticas</strong> o en <em>"Todas las colecciones"</em>. Filtra en tiempo real por búsqueda, rango de precio o ediciones especiales y reserva tu prueba física en tienda para la apertura del 15 de octubre.
            </p>
          </div>

          {/* Quick Cart / Reservation Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-2.5 text-xs text-foreground shadow-xs">
              <ShoppingCart className="size-4 text-primary" />
              <span className="text-muted-foreground">Lista de reserva:</span>
              <strong className="font-semibold text-espresso">{cartItems.length} producto{cartItems.length === 1 ? '' : 's'}</strong>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary/70 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-border"
                title="Restablecer todos los filtros"
              >
                <RotateCcw className="size-3" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            )}
          </div>
        </div>

        {/* 10 CATEGORIES SELECTOR TABS (PLUS "TODAS") */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Selecciona una categoría para filtrar (15 productos por colección):
            </p>
            <span className="hidden text-xs text-taupe md:inline">
              10 categorías oficiales · 150 productos cargados
            </span>
          </div>

          <div className="mt-4 flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {/* Tab: All 150 products */}
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`group relative flex shrink-0 items-center gap-2.5 rounded-sm border px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'border-espresso bg-espresso text-white shadow-sm ring-1 ring-espresso'
                  : 'border-border bg-card text-foreground hover:border-primary/60 hover:bg-secondary/40'
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-sm text-xs font-mono font-semibold ${
                  selectedCategoryId === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-muted-foreground group-hover:text-foreground'
                }`}
              >
                ★
              </span>
              <Layers className={`size-4 shrink-0 ${selectedCategoryId === 'all' ? 'text-sand' : 'text-primary'}`} strokeWidth={1.75} />
              <div>
                <div className="text-xs font-semibold leading-tight whitespace-nowrap">Todas las colecciones</div>
                <div className={`text-[10px] ${selectedCategoryId === 'all' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  150 productos
                </div>
              </div>
            </button>

            {/* The 10 specific categories */}
            {CATEGORIES_DATA.map((cat, index) => {
              const Icon = ICONS_MAP[cat.iconName] || Laptop
              const isActive = cat.id === selectedCategoryId
              return (
                <button
                  key={cat.id}
                  type="button"
                  data-category-id={cat.id}
                  onClick={(e) => {
                    e.preventDefault()
                    handleCategorySelect(cat.id)
                  }}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-sm border px-4 py-3 text-left transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? 'border-espresso bg-espresso text-white shadow-sm ring-2 ring-primary/40'
                      : 'border-border bg-card text-foreground hover:border-primary/60 hover:bg-secondary/40'
                  }`}
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-sm text-xs font-mono font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon className={`size-4 shrink-0 ${isActive ? 'text-sand' : 'text-primary'}`} strokeWidth={1.75} />
                  <div>
                    <div className="text-xs font-semibold leading-tight whitespace-nowrap">{cat.shortName}</div>
                    <div className={`text-[10px] ${isActive ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {cat.products.length} productos
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ACTIVE CATEGORY BANNER + FILTERS TOOLBAR */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Info */}
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-primary/15 text-primary">
                <CurrentIcon className="size-6" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {currentCategory ? 'Colección activa' : 'Vista global'}
                </span>
                <h3 className="font-serif text-2xl text-espresso md:text-3xl">
                  {currentCategory ? currentCategory.name : 'Catálogo Completo BuyTevora (10 Colecciones)'}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {currentCategory
                    ? currentCategory.tagline
                    : 'Explorando los 150 dispositivos de artesanía tecnológica, diseño duradero y componentes reparables.'}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-taupe">
                  <ShieldCheck className="size-3.5" />
                  <span>
                    {currentCategory
                      ? currentCategory.highlight
                      : 'Todos los productos cuentan con garantía de 3 a 5 años y soporte presencial en tienda'}
                  </span>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={currentCategory ? `Buscar en ${currentCategory.shortName}...` : 'Buscar entre los 150 productos...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-border bg-background py-2 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* SECONDARY FILTER BAR: Price Range, Special Editions, Sort Order */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Filter className="size-3" /> Filtros:
              </span>

              {/* Price range chips */}
              <div className="inline-flex rounded-sm border border-border bg-background p-0.5">
                {[
                  { id: 'all', label: 'Cualquier precio' },
                  { id: 'under100', label: '< €100' },
                  { id: '100to500', label: '€100 - €500' },
                  { id: '500to1000', label: '€500 - €1.000' },
                  { id: 'over1000', label: '> €1.000' },
                ].map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setPriceRangeFilter(range.id as any)}
                    className={`rounded-xs px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      priceRangeFilter === range.id
                        ? 'bg-espresso text-white'
                        : 'text-foreground/80 hover:bg-secondary'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Badges / special filter */}
              <div className="inline-flex rounded-sm border border-border bg-background p-0.5">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'special-editions', label: 'Ediciones Especiales' },
                  { id: 'in-stock', label: 'Stock Alto (>5)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBadgeFilter(item.id as any)}
                    className={`rounded-xs px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      badgeFilter === item.id
                        ? 'bg-espresso text-white'
                        : 'text-foreground/80 hover:bg-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <label htmlFor="priceSortSelect" className="text-xs text-muted-foreground whitespace-nowrap">
                Ordenar por:
              </label>
              <select
                id="priceSortSelect"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="rounded-sm border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
              >
                <option value="featured">Destacados de catálogo</option>
                <option value="price-asc">Precio: de menor a mayor</option>
                <option value="price-desc">Precio: de mayor a menor</option>
                <option value="rating">Mejor valorados</option>
                <option value="stock">Mayor disponibilidad</option>
              </select>
            </div>
          </div>
        </div>

        {/* FEEDBACK & PRODUCT COUNT */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              Mostrando <strong className="font-semibold text-foreground">{filteredProducts.length}</strong> de{' '}
              {selectedCategoryId === 'all' ? '150 productos' : '15 productos de esta categoría'}
            </span>
            {hasActiveFilters && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-espresso">
                Filtros activos
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Prueba física en tienda disponible a partir del 15 de octubre</span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-primary underline underline-offset-4 hover:text-espresso"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group flex cursor-pointer flex-col justify-between rounded-sm border border-border bg-card p-4 transition-all duration-300 hover:border-espresso hover:shadow-md"
              >
                <div>
                  {/* Image Box */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-secondary/60">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                    />
                    {product.badge && (
                      <div className="absolute left-2 top-2 rounded-xs bg-espresso/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-xs bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-xs">
                      <Star className="size-2.5 fill-amber-500 text-amber-500" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Category Pill for multi-category view */}
                  <div className="mt-3.5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategorySelect(product.categoryId)
                      }}
                      className="text-[10px] font-medium uppercase tracking-wider text-primary hover:underline"
                    >
                      {product.categoryShortName}
                    </button>
                    <span className="text-[10px] text-muted-foreground">{product.stock} en tienda</span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-1">
                    <h4 className="font-serif text-base font-medium text-espresso transition-colors group-hover:text-primary">
                      {product.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Specs chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className="rounded-xs bg-secondary/80 px-1.5 py-0.5 text-[9px] text-foreground/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-4 border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-espresso">{product.priceFormatted}</div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-muted-foreground line-through">
                          {product.originalPrice}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`flex size-8 items-center justify-center rounded-sm transition-colors duration-200 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-secondary text-foreground hover:bg-espresso hover:text-white'
                      }`}
                      title="Añadir a la lista de reserva para apertura"
                    >
                      {isAdded ? <Check className="size-4" /> : <ArrowRight className="size-4" strokeWidth={1.5} />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="mt-12 rounded-lg border border-dashed border-border py-16 text-center">
            <Search className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 text-base font-serif text-foreground">Ningún producto coincide con tus filtros</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Intenta cambiar el rango de precio, borrar la búsqueda o seleccionar otra de las 10 categorías.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 rounded-sm bg-espresso px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

        {/* 10 CATEGORIES SUMMARY TILES (BOTTOM NAVIGATION) */}
        <div className="mt-20 rounded-lg border border-border bg-secondary/30 p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                Directorio Rápido
              </span>
              <h3 className="font-serif text-2xl text-espresso">Explora directamente por Colección</h3>
            </div>
            <div className="text-xs text-muted-foreground">
              Cada colección cuenta con <strong>15 piezas seleccionadas</strong>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES_DATA.map((cat, idx) => {
              const Icon = ICONS_MAP[cat.iconName] || Laptop
              const isSelected = cat.id === selectedCategoryId
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    handleCategorySelect(cat.id)
                    setSearchQuery('')
                    if (sectionRef.current) {
                      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`flex flex-col justify-between rounded-sm border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-espresso bg-espresso text-white shadow-xs'
                      : 'border-border/80 bg-card text-foreground hover:border-primary/50 hover:bg-secondary/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold opacity-60">0{idx + 1}</span>
                    <Icon className={`size-4 ${isSelected ? 'text-sand' : 'text-primary'}`} />
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-medium leading-snug">{cat.shortName}</div>
                    <div className={`mt-1 text-[10px] ${isSelected ? 'text-white/70' : 'text-muted-foreground'}`}>
                      15 productos
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-md bg-espresso px-4 py-3 text-xs text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                {selectedProduct.badge && (
                  <div className="absolute left-3 top-3 rounded-xs bg-espresso px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {selectedProduct.badge}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-primary">
                      {selectedProduct.categoryName}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="size-3.5 fill-amber-500" />
                      <span className="font-semibold">{selectedProduct.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({selectedProduct.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl text-espresso md:text-3xl">
                    {selectedProduct.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-taupe">
                    {selectedProduct.tagline}
                  </p>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/80">
                      Especificaciones de autor:
                    </div>
                    <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-foreground/90">
                          <Check className="size-3 text-primary shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Stock para gran apertura:</span>
                    <strong className="text-foreground">{selectedProduct.stock} unidades en tienda</strong>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-medium text-espresso">
                      {selectedProduct.priceFormatted}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex-1 rounded-sm bg-primary py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-espresso cursor-pointer"
                    >
                      Reservar para el 15 de Octubre
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="rounded-sm border border-border px-4 py-3 text-xs font-medium text-foreground hover:bg-secondary cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
