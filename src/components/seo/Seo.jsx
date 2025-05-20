import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Seo = ({ 
  title = 'Horizon Ética - Consultoría en ética para IA',
  description = 'Expertos en consultoría de ética para inteligencia artificial. Ayudamos a empresas a implementar IA de manera responsable y ética.',
  keywords = 'ética, inteligencia artificial, IA, consultoría, responsabilidad, tecnología, innovación',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  locale = 'es_MX',
  siteName = 'Horizon Ética',
  twitterCard = 'summary_large_image',
  twitterSite = '@horizonetica',
  twitterCreator = '@horizonetica',
  children 
}) => {
  const fullTitle = title === 'Horizon Ética' ? title : `${title} | Horizon Ética`;
  
  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#231F31" />

      {/* Preconnect a dominios externos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {children}
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  locale: PropTypes.string,
  siteName: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterSite: PropTypes.string,
  twitterCreator: PropTypes.string,
  children: PropTypes.node,
};

export default Seo;
