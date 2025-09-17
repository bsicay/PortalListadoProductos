import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useLogin from '@hooks/useLogin';
import styles from './LoginModal.module.css';

function LoginModal({ isOpen, onClose }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    login, success, error, loading,
  } = useLogin();

  // Redirigir a Home después del login exitoso
  useEffect(() => {
    if (success?.accessToken) {
      handleClose();
      navigate('/');
    }
  }, [success, navigate]);

  const handleFormChange = (e) => {
    const field = e.target.name;
    const { value } = e.target;
    setForm((lastValue) => ({ ...lastValue, [field]: value }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (e) => {
    setErrors((lastVal) => ({ ...lastVal, [e.target.name]: null }));
  };

  const validateEmail = () => {
    if (form?.email?.trim().length > 0) return true;
    setErrors((lastVal) => ({ ...lastVal, email: 'El email es obligatorio.' }));
    return false;
  };

  const validatePassword = () => {
    if (form?.password?.trim().length > 0) return true;
    setErrors((lastVal) => ({ ...lastVal, password: 'La contraseña es obligatoria.' }));
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    if (!(validateEmail() && validatePassword())) return;
    login(form);
  };

  const handleClose = () => {
    setForm({});
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  // Cerrar modal al hacer clic fuera de él
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={handleClose}>
          <XMarkIcon className={styles.closeIcon} />
        </button>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Iniciar sesión</h2>
          
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ej.: ejemplo@mail.com"
                value={form?.email || ''}
                onChange={handleFormChange}
                onBlur={validateEmail}
                onFocus={clearError}
                className={`${styles.input} ${errors?.user ? styles.inputError : ''}`}
              />
              {errors?.user && (
                <span className={styles.errorText}>{errors.user}</span>
              )}
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Contraseña
              </label>
              <div className={styles.passwordContainer}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={form?.password || ''}
                  onChange={handleFormChange}
                  onBlur={validatePassword}
                  onFocus={clearError}
                  className={`${styles.input} ${styles.passwordInput} ${errors?.password ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className={styles.eyeIcon} />
                  ) : (
                    <EyeIcon className={styles.eyeIcon} />
                  )}
                </button>
              </div>
              {errors?.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            {/* Forgot Password Link */}
            <a href="#" className={styles.forgotPassword}>
              Olvidé mi contraseña
            </a>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Iniciando sesión...' : 'Entrar'}
            </button>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                {error?.message ?? 'Ocurrió un error al iniciar sesión.'}
              </div>
            )}

            {/* Registration Link */}
            <div className={styles.registrationLink}>
              <span>¿No tienes una cuenta? </span>
              <a href="#" className={styles.registerLink}>
                Regístrate
              </a>
            </div>

            {/* Social Login Options */}
            <div className={styles.socialLogin}>
              <button type="button" className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Email Access Code Link */}
            <a href="#" className={styles.emailAccessLink}>
              Recibir código de acceso por e-mail
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
