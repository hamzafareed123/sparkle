import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await login(data.email, data.password)
      toast.success('Welcome back!')
      navigate('/', { replace: true })
    } catch {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-4">
      <div
        className="w-full max-w-md rounded-[var(--border-radius-md)] bg-white p-8"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-color)]">
            <Sparkles size={28} className="text-[#ddbf61]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Sparkle &amp; Shine</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Email</label>
            <input
              type="email"
              autoComplete="email"
              {...register('email')}
              className="w-full rounded-[var(--border-radius-sm)] border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[#dbeccf]"
              placeholder="admin@sparkle.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                className="w-full rounded-[var(--border-radius-sm)] border border-gray-200 px-4 py-3 pr-11 text-sm outline-none transition focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[#dbeccf]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-[var(--border-radius-sm)] bg-[var(--primary-color)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:opacity-60"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
