import { cva } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const loadingVariants = cva(
  'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        default: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const Loading = ({ size, className, ...props }) => (
  <div
    className={cn(loadingVariants({ size }), className)}
    {...props}
  />
)

export const LoadingSpinner = ({ size = 'default', className, ...props }) => (
  <div className="flex items-center justify-center">
    <Loading size={size} className={className} {...props} />
  </div>
)

export const LoadingPage = ({ message = 'Cargando...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <Loading size="xl" className="mx-auto mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
)

export const LoadingCard = () => (
  <div className="card animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
)

