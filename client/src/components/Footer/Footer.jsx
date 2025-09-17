import React from 'react';
import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Contact Bar - Dark Blue Background */}
      <div className={styles.topContactBar}>
        <div className={styles.contactItem}>
          <BuildingStorefrontIcon className={styles.contactIcon} />
          <span className={styles.contactText}>Tiendas</span>
        </div>
        <div className={styles.contactItem}>
          <EnvelopeIcon className={styles.contactIcon} />
          <a
            href="mailto:tusamigos@cemaco.com"
            className={styles.contactLink}
          >
            tusamigos@cemaco.com
          </a>
        </div>
        <div className={styles.contactItem}>
          <ChatBubbleLeftRightIcon className={styles.contactIcon} />
          <span className={styles.contactText}>Chat</span>
        </div>
        <div className={styles.contactItem}>
          <PhoneIcon className={styles.contactIcon} />
          <a href="tel:+50224108300" className={styles.contactLink}>
            2410-8300
          </a>
        </div>
      </div>

      {/* Main Footer Content - Light Grey Background */}
      <div className={styles.mainFooterContent}>
        {/* Section 1: Servicios */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Servicios</h3>
          <ul className={styles.sectionList}>
            <li><NavLink to="/instalaciones" className={styles.sectionLink}>Instalaciones</NavLink></li>
            <li><NavLink to="/blog" className={styles.sectionLink}>Blog</NavLink></li>
            <li><NavLink to="/tiendas" className={styles.sectionLink}>Tiendas</NavLink></li>
            <li><NavLink to="/privilegio" className={styles.sectionLink}>Privilegio</NavLink></li>
            <li><NavLink to="/empresas" className={styles.sectionLink}>Servicio a empresas</NavLink></li>
            <li><NavLink to="/bodas" className={styles.sectionLink}>Bodas</NavLink></li>
            <li><NavLink to="/actividades" className={styles.sectionLink}>Actividades</NavLink></li>
          </ul>
        </div>

        {/* Section 2: Nuestros valores */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Nuestros valores</h3>
          <ul className={styles.sectionList}>
            <li><NavLink to="/sostenibilidad" className={styles.sectionLink}>Sostenibilidad</NavLink></li>
            <li><NavLink to="/garantia" className={styles.sectionLink}>Garantía total</NavLink></li>
            <li><NavLink to="/sistemab" className={styles.sectionLink}>Sistema B</NavLink></li>
          </ul>
        </div>

        {/* Section 3: Venta en línea */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Venta en línea</h3>
          <ul className={styles.sectionList}>
            <li><NavLink to="/retirar-en-tienda" className={styles.sectionLink}>Retirar en tienda</NavLink></li>
            <li><NavLink to="/metodos-de-pago" className={styles.sectionLink}>Métodos de pago</NavLink></li>
            <li><NavLink to="/preguntas-frecuentes" className={styles.sectionLink}>Preguntas frecuentes</NavLink></li>
            <li><NavLink to="/descargar-aplicacion" className={styles.sectionLink}>Descargar aplicación</NavLink></li>
          </ul>
        </div>

        {/* Section 4: Grupo Cemaco */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Grupo Cemaco</h3>
          <ul className={styles.sectionList}>
            <li><NavLink to="/unete-a-nuestro-equipo" className={styles.sectionLink}>Únete a nuestro equipo</NavLink></li>
            <li><NavLink to="/sobre-nosotros" className={styles.sectionLink}>Sobre nosotros</NavLink></li>
            <li><NavLink to="/ser-proveedor" className={styles.sectionLink}>Deseas ser proveedor</NavLink></li>
            <li><NavLink to="/jugueton" className={styles.sectionLink}>Juguetón</NavLink></li>
            <li><NavLink to="/bebe-jugueton" className={styles.sectionLink}>Bebé Juguetón</NavLink></li>
          </ul>
        </div>

        {/* Section 5: Empresa B */}
        <div className={`${styles.footerSection} ${styles.companySection}`}>
          <h3 className={styles.sectionTitle}>Empresa</h3>
          <div className={styles.companyBBadge}>
            <div className={styles.bLogoContainer}>
              <span className={styles.bLogo}>B</span>
            </div>
            <div className={styles.bTextContent}>
              <p className={styles.bTitle}>Somos una empresa B</p>
              <p className={styles.bDescription}>
                Estamos orgullosos de ser reconocidos por los más altos
                estándares de sostenibilidad social y ambiental.
              </p>
              <NavLink to="/conoce-mas" className={styles.learnMoreLink}>Conoce más</NavLink>
            </div>
          </div>
          
          {/* Suscríbete dentro de la sección Empresa */}
          <div className={styles.subscribeSection}>
            <h3 className={styles.sectionTitle}>Suscríbete</h3>
            <p className={styles.subscribeText}>Recibe ofertas, beneficios y noticias</p>
            <form className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className={styles.subscribeInput}
              />
              <button type="submit" className={styles.subscribeButton}>SUSCRIBIRME</button>
            </form>
          </div>
        </div>

        {/* Section 6: Opiniones certificadas */}
        <div className={`${styles.footerSection} ${styles.certifiedOpinionsSection}`}>
          <div className={styles.certifiedOpinionsBadge}>
            <p className={styles.opinionsCount}>521K</p>
            <div className={styles.starRating}>
              <StarIcon className={styles.starIcon} />
              <StarIcon className={styles.starIcon} />
              <StarIcon className={styles.starIcon} />
              <StarIcon className={styles.starIcon} />
              <StarIcon className={styles.starIcon} />
            </div>
            <p className={styles.opinionsText}>Opiniones certificadas</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;