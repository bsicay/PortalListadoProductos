import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import LoginModal from '@components/LoginModal/LoginModal';
import useToken from '@hooks/useToken';
import useLogout from '@hooks/useLogout';
import styles from './Header.module.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const token = useToken();
  const { logout, loading: logoutLoading } = useLogout();

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implementar búsqueda
    console.log('Búsqueda:', searchQuery);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                className={styles.logoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className={styles.logoPlaceholder} style={{ display: 'none' }}>
                <div className={styles.logoIcon}>🏪</div>
              </div>
            </div>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <div className={styles.navItem}>
            <Link 
              to="/departments" 
              className={`${styles.navLink} ${isActive('/departments') ? styles.active : ''}`}
            >
              Departamentos
              <ChevronDownIcon className={styles.chevronIcon} />
            </Link>
          </div>
        </nav>

        {/* Barra de búsqueda */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <MagnifyingGlassIcon className={styles.searchIcon} />
              </button>
            </div>
          </form>
        </div>

        {/* Acciones del usuario */}
        <div className={styles.userActions}>
          {token ? (
            <button onClick={handleLogout} className={styles.userAction} disabled={logoutLoading}>
              <ArrowRightOnRectangleIcon className={styles.userIcon} />
              <span className={styles.userText}>
                {logoutLoading ? 'Cerrando...' : 'Cerrar sesión'}
              </span>
            </button>
          ) : (
            <button onClick={handleLoginClick} className={styles.userAction}>
              <UserIcon className={styles.userIcon} />
              <span className={styles.userText}>Iniciar sesión</span>
            </button>
          )}
          
          <Link to="/cart" className={styles.cartAction}>
            <ShoppingCartIcon className={styles.cartIcon} />
          </Link>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
      />
    </header>
  );
}

export default Header;