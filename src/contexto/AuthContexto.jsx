// contexto para manejar la autenticación de usuarios con Supabase. Proporciona un contexto global para acceder al usuario actual y a la función de cerrar sesión desde cualquier componente de la aplicación. Utiliza un "hook" personalizado para facilitar su uso en los componentes hijos.

import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../servicios/supabaseCliente';

// 1. Creamos el contexto
const AuthContexto = createContext();

// 2. Creamos un "hook" personalizado para usarlo fácilmente
export const useAuth = () => useContext(AuthContexto);

// 3. Creamos el proveedor que envolverá nuestra app
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Revisar si ya hay una sesión activa al cargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      setCargando(false);
    });

    // Escuchar cambios (cuando el usuario inicia o cierra sesión)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContexto.Provider value={{ usuario, cerrarSesion }}>
      {!cargando && children}
    </AuthContexto.Provider>
  );
};