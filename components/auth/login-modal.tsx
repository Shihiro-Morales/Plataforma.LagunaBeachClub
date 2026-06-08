'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { X, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: string): { message: string; type: 'credentials' | 'connection' | 'session' | 'generic' } {
  const lowerError = error.toLowerCase();
  
  if (lowerError.includes('credenciales') || lowerError.includes('credentials') || 
      lowerError.includes('password') || lowerError.includes('contraseña') ||
      lowerError.includes('invalid') || lowerError.includes('incorrect') ||
      lowerError.includes('401') || lowerError.includes('unauthorized')) {
    return { message: 'Usuario o contraseña incorrectos. Por favor, verifica tus datos.', type: 'credentials' };
  }
  
  if (lowerError.includes('network') || lowerError.includes('fetch') || 
      lowerError.includes('connection') || lowerError.includes('conexión') ||
      lowerError.includes('timeout') || lowerError.includes('failed to fetch')) {
    return { message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.', type: 'connection' };
  }
  
  if (lowerError.includes('expired') || lowerError.includes('expirada') || 
      lowerError.includes('session') || lowerError.includes('sesión')) {
    return { message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', type: 'session' };
  }
  
  return { message: error || 'Error al iniciar sesión. Por favor, intenta nuevamente.', type: 'generic' };
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const { login, user } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'credentials' | 'connection' | 'session' | 'generic'>('generic');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      const userName = user?.first_name || username;
      toast({
        title: '¡Bienvenido!',
        description: `Hola ${userName}, has iniciado sesión correctamente.`,
      });
      onClose();
      setUsername('');
      setPassword('');
    } catch (err: any) {
      const { message, type } = getErrorMessage(err.message || '');
      setError(message);
      setErrorType(type);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const ErrorIcon = errorType === 'connection' ? WifiOff : AlertCircle;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta de Laguna Beach Club</p>
        </div>

        {error && (
          <div className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${
            errorType === 'connection' 
              ? 'bg-amber-50 border border-amber-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <ErrorIcon className={`h-5 w-5 shrink-0 mt-0.5 ${
              errorType === 'connection' ? 'text-amber-600' : 'text-red-600'
            }`} />
            <div>
              <p className={`text-sm font-medium ${
                errorType === 'connection' ? 'text-amber-800' : 'text-red-800'
              }`}>
                {errorType === 'credentials' && 'Credenciales incorrectas'}
                {errorType === 'connection' && 'Sin conexión'}
                {errorType === 'session' && 'Sesión expirada'}
                {errorType === 'generic' && 'Error'}
              </p>
              <p className={`text-sm mt-1 ${
                errorType === 'connection' ? 'text-amber-700' : 'text-red-700'
              }`}>
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email o Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToRegister?.();
              }}
              className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
