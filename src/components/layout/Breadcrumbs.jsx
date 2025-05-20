import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { ChevronRight, Home as HomeIcon, Briefcase, ShieldQuestion, MessageCircle } from 'lucide-react';

    const navItems = [
        { path: '/', label: 'Inicio', icon: HomeIcon, name: 'Inicio' },
        { path: '/test', label: 'Diagnóstico', icon: ShieldQuestion, name: 'Test de Diagnóstico' },
        { path: '/chat', label: 'Chat IA', icon: MessageCircle, name: 'Chat Inteligente' },
        { path: '/services', label: 'Servicios', icon: Briefcase, name: 'Nuestros Servicios'},
    ];
    
    const Breadcrumbs = () => {
      const location = useLocation();
      const pathnames = location.pathname.split('/').filter(x => x);
    
      return (
        <nav aria-label="Breadcrumb" className="mb-element-margin-v text-sm">
          <ol className="flex items-center space-x-1 text-brand-light-text/70">
            <li>
              <Link to="/" className="hover:text-brand-warm-orange transition-colors flex items-center">
                <HomeIcon className="h-4 w-4 mr-1.5" /> Inicio
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const currentNavItem = navItems.find(item => item.path === to || (item.path !== '/' && to.startsWith(item.path)));
              let displayName = currentNavItem ? currentNavItem.name : value.charAt(0).toUpperCase() + value.slice(1);
              if (value === 'privacy-policy') displayName = 'Política de Privacidad';
    
              return (
                <React.Fragment key={to}>
                  <li>
                    <ChevronRight className="h-4 w-4 text-brand-light-text/50" />
                  </li>
                  <li>
                    {isLast ? (
                      <span className="font-semibold text-brand-light-text flex items-center">
                        {currentNavItem?.icon && <currentNavItem.icon className="h-4 w-4 mr-1.5" />}
                        {displayName}
                      </span>
                    ) : (
                      <Link to={to} className="hover:text-brand-warm-orange transition-colors flex items-center">
                        {currentNavItem?.icon && <currentNavItem.icon className="h-4 w-4 mr-1.5" />}
                        {displayName}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      );
    };

    export default Breadcrumbs;