'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { X, AlertCircle, WifiOff, UserX, Mail, Lock } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: string): { message: string; type: 'user' | 'email' | 'password' | 'connection' | 'validation' | 'generic' } {
  const lowerError = error.toLowerCase();
  
  if (lowerError.includes('username') && (lowerError.includes('exists') || lowerError.includes('existe') || lowerError.includes('taken') || lowerError.includes('already'))) {
    return { message: 'Este nombre de usuario ya está en uso. Por favor, elige otro.', type: 'user' };
  }
  
  if (lowerError.includes('email') && (lowerError.includes('exists') || lowerError.includes('existe') || lowerError.includes('taken') || lowerError.includes('already') || lowerError.includes('registered'))) {
    return { message: 'Este correo electrónico ya está registrado. ¿Quieres iniciar sesión?', type: 'email' };
  }
  
  if (lowerError.includes('password') && lowerError.includes('match') || lowerError.includes('coinciden') || lowerError.includes('contraseñas')) {
    return { message: 'Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.', type: 'password' };
  }
  
  if (lowerError.includes('password') && (lowerError.includes('weak') || lowerError.includes('short') || lowerError.includes('débil') || lowerError.includes('corta'))) {
    return { message: 'La contraseña es muy débil. Usa al menos 8 caracteres con letras y números.', type: 'password' };
  }
  
  if (lowerError.includes('network') || lowerError.includes('fetch') || 
      lowerError.includes('connection') || lowerError.includes('conexión') ||
      lowerError.includes('timeout') || lowerError.includes('failed to fetch')) {
    return { message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.', type: 'connection' };
  }
  
  if (lowerError.includes('required') || lowerError.includes('obligatorio') || lowerError.includes('campo')) {
    return { message: 'Por favor, completa todos los campos obligatorios.', type: 'validation' };
  }
  
  return { message: error || 'Error al registrarse. Por favor, intenta nuevamente.', type: 'generic' };
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register, user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'user' | 'email' | 'password' | 'connection' | 'validation' | 'generic'>('generic');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.username.trim()) {
      errors.username = 'El usuario es obligatorio';
    }
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }
    if (!formData.first_name.trim()) {
      errors.first_name = 'El nombre es obligatorio';
    }
    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es obligatorio';
    }
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'Mínimo 6 caracteres';
    }
    if (!formData.password2) {
      errors.password2 = 'Confirma tu contraseña';
    } else if (formData.password !== formData.password2) {
      errors.password2 = 'Las contraseñas no coinciden';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      await register(formData);
      toast({
        title: '¡Cuenta creada correctamente!',
        description: 'Ahora inicia sesión para continuar.',
      });
      onClose();
      setFormData({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        telefono: '',
      });
    } catch (err: any) {
      const { message, type } = getErrorMessage(err.message || '');
      setError(message);
      setErrorType(type);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getErrorIcon = () => {
    switch (errorType) {
      case 'connection': return WifiOff;
      case 'user': return UserX;
      case 'email': return Mail;
      case 'password': return Lock;
      default: return AlertCircle;
    }
  };

  const ErrorIcon = getErrorIcon();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-4 sm:my-8 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]">
        {/* Fixed Header with X button */}
        <div className="sticky top-0 bg-white rounded-t-2xl z-10 px-8 pt-6 pb-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          <div className="text-center pr-8">
            <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
            <p className="text-gray-500 text-sm mt-1">Únete a Laguna Beach Club</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {error && (
            <div className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${
              errorType === 'connection' 
                ? 'bg-amber-50 border border-amber-200' 
                : errorType === 'email'
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <ErrorIcon className={`h-5 w-5 shrink-0 mt-0.5 ${
                errorType === 'connection' ? 'text-amber-600' : 
                errorType === 'email' ? 'text-blue-600' : 'text-red-600'
              }`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  errorType === 'connection' ? 'text-amber-800' : 
                  errorType === 'email' ? 'text-blue-800' : 'text-red-800'
                }`}>
                  {errorType === 'user' && 'Usuario no disponible'}
                  {errorType === 'email' && 'Email ya registrado'}
                  {errorType === 'password' && 'Error de contraseña'}
                  {errorType === 'connection' && 'Sin conexión'}
                  {errorType === 'validation' && 'Campos incompletos'}
                  {errorType === 'generic' && 'Error'}
                </p>
                <p className={`text-sm mt-1 ${
                  errorType === 'connection' ? 'text-amber-700' : 
                  errorType === 'email' ? 'text-blue-700' : 'text-red-700'
                }`}>
                  {error}
                </p>
                {errorType === 'email' && (
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToLogin?.();
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 hover:underline"
                  >
                    Ir a iniciar sesión
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Juan"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                    fieldErrors.first_name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.first_name && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.first_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Pérez"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                    fieldErrors.last_name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.last_name && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.last_name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="juanperez"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                  fieldErrors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {fieldErrors.username && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                  fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+505 8888-8888"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                  fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {fieldErrors.password && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-shadow ${
                  fieldErrors.password2 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {fieldErrors.password2 && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.password2}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center pb-2">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToLogin?.();
                }}
                className="text-cyan-600 hover:text-cyan-700 font-semibold hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
