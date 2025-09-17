import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { LoadingSpinner, LoadingCard } from '../components/ui/Loading'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data - En producción esto vendría de la API
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'El último smartphone de Apple con chip A17 Pro y cámara de 48MP',
      price: 999.99,
      sku: 'IPH15PRO-001',
      inventory: 15,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      category_name: 'Electrónicos',
      average_rating: 4.5,
      review_count: 10
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'Smartphone Android con IA integrada y pantalla AMOLED',
      price: 799.99,
      sku: 'SGS24-001',
      inventory: 25,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      category_name: 'Electrónicos',
      average_rating: 4.3,
      review_count: 8
    },
    {
      id: 3,
      name: 'Sofá 3 Plazas Moderno',
      description: 'Sofá cómodo y elegante para sala, tapizado en tela gris',
      price: 599.99,
      sku: 'SOFA3P-001',
      inventory: 8,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      category_name: 'Hogar y Jardín',
      average_rating: 4.7,
      review_count: 15
    },
    {
      id: 4,
      name: 'Pelota de Fútbol Oficial',
      description: 'Pelota de fútbol oficial FIFA, tamaño 5',
      price: 24.99,
      sku: 'BALL-FIFA-001',
      inventory: 50,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      category_name: 'Deportes',
      average_rating: 4.2,
      review_count: 5
    },
    {
      id: 5,
      name: 'Camiseta Nike Dri-FIT',
      description: 'Camiseta deportiva de algodón con tecnología Dri-FIT',
      price: 29.99,
      sku: 'NIKE-TSHIRT-001',
      inventory: 30,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      category_name: 'Ropa y Accesorios',
      average_rating: 4.4,
      review_count: 12
    },
    {
      id: 6,
      name: 'Set de Ollas Antiadherentes',
      description: 'Set de 5 ollas antiadherentes de acero inoxidable',
      price: 89.99,
      sku: 'POTS-SET-001',
      inventory: 12,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      category_name: 'Cocina y Mesa',
      average_rating: 4.6,
      review_count: 7
    }
  ]

  const categories = [
    'Todas las categorías',
    'Electrónicos',
    'Hogar y Jardín',
    'Deportes',
    'Ropa y Accesorios',
    'Cocina y Mesa',
    'Herramientas'
  ]

  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'price_asc', label: 'Precio: Menor a Mayor' },
    { value: 'price_desc', label: 'Precio: Mayor a Menor' },
    { value: 'rating', label: 'Mejor Valorados' },
    { value: 'newest', label: 'Más Recientes' }
  ]

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category_name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'rating':
        return (b.average_rating || 0) - (a.average_rating || 0)
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleAddToCart = (productId) => {
    console.log('Agregar al carrito:', productId)
    // Implementar lógica de carrito
  }

  const handleToggleFavorite = (productId) => {
    console.log('Toggle favorito:', productId)
    // Implementar lógica de favoritos
  }

  const handleViewDetails = (productId) => {
    console.log('Ver detalles:', productId)
    // Implementar navegación a detalles
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
              <p className="text-gray-600">
                {sortedProducts.length} productos encontrados
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-64"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'Todas las categorías' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <ListBulletIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

