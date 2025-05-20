import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { Briefcase, MessageCircle, Home as HomeIcon, ShieldQuestion, Menu, X } from 'lucide-react';
    import { IllustrationHeader } from '@/components/illustrations/IllustrationHeader';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"

    const navItems = [
      { path: '/', label: 'Inicio', icon: HomeIcon, name: 'Inicio' },
      { path: '/test', label: 'Diagnóstico', icon: ShieldQuestion, name: 'Test de Diagnóstico' },
      { path: '/chat', label: 'Chat IA', icon: MessageCircle, name: 'Chat Inteligente' },
      { path: '/services', label: 'Servicios', icon: Briefcase, name: 'Nuestros Servicios'},
    ];

    const Header = ({ onStartTest }) => {
      const location = useLocation();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

      const handleNavLinkClick = (e, path) => {
        if (path === '/test') {
          onStartTest(e);
        }
        setIsMobileMenuOpen(false); 
      };

      return (
        <header className="sticky top-0 z-40 shadow-2xl bg-brand-deep-indigo/90 backdrop-blur-lg border-b border-brand-light-text/10">
          <div className="container mx-auto px-element-padding py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center group" aria-label="Página de inicio de ÉticaIA">
              <div className="w-24 sm:w-32 h-10 sm:h-12 mr-2 sm:mr-3">
                <IllustrationHeader />
              </div>
              <span 
                className="text-2xl sm:text-3xl font-bold text-brand-vibrant-red group-hover:text-brand-orange-red transition-colors"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              >
                Ética<span className="text-brand-warm-orange" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>IA</span>
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-element-margin-h bg-brand-deep-indigo/60 px-3 py-2 rounded-lg shadow-inner border border-brand-light-text/10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavLinkClick(e, item.path)}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-out group
                    ${location.pathname === item.path 
                      ? 'bg-brand-vibrant-red text-brand-light-text shadow-lg scale-105' 
                      : 'text-brand-light-text/90 hover:bg-brand-orange-red/80 hover:text-brand-deep-indigo hover:shadow-md hover:scale-105'
                    } focus-visible:ring-2 focus-visible:ring-focus-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep-indigo`}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 mr-1.5 lg:mr-2 transition-colors ${location.pathname === item.path ? 'text-brand-light-text' : 'text-brand-warm-orange group-hover:text-brand-deep-indigo'}`} />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md text-brand-light-text/90 hover:bg-brand-orange-red/80 hover:text-brand-deep-indigo focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-vibrant-red"
                    aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    className="w-56 bg-brand-deep-indigo/95 border-brand-orange-red/50 text-brand-light-text shadow-xl mr-element-padding"
                    sideOffset={10}
                    align="end"
                >
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        onClick={(e) => handleNavLinkClick(e, item.path)}
                        className={`flex items-center w-full px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out
                          ${location.pathname === item.path 
                            ? 'bg-brand-vibrant-red text-brand-light-text' 
                            : 'hover:bg-brand-orange-red/70 hover:text-brand-deep-indigo'
                          } focus:bg-brand-orange-red/70 focus:text-brand-deep-indigo focus:outline-none`}
                        aria-current={location.pathname === item.path ? "page" : undefined}
                      >
                        <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.path ? 'text-brand-light-text' : 'text-brand-warm-orange'}`} />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      );
    };

    export default Header;