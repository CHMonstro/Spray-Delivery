// Implementação simplificada de autenticação
import { useState, useEffect, createContext, useContext } from 'react';

// Tipos
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
}

// Contexto de autenticação
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Funções de autenticação
export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificação simplificada (em produção, isso seria uma chamada de API real)
    if (email && password.length >= 6) {
      // Usuário mockado para demonstração
      const user: User = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
        phone: '(11) 99999-9999'
      };
      
      // Salvar no localStorage para persistência
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

export async function registerUser(
  name: string, 
  email: string, 
  password: string, 
  phone?: string
): Promise<User | null> {
  try {
    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificação simplificada (em produção, isso seria uma chamada de API real)
    if (name && email && password.length >= 6) {
      // Usuário mockado para demonstração
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        phone
      };
      
      // Salvar no localStorage para persistência
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem('user');
}

// Provider de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Verificar se o usuário está logado ao carregar a página
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    const user = await loginUser(email, password);
    setLoading(false);
    
    if (user) {
      setUser(user);
      return true;
    }
    
    return false;
  };
  
  const register = async (name: string, email: string, password: string, phone?: string) => {
    setLoading(true);
    const user = await registerUser(name, email, password, phone);
    setLoading(false);
    
    if (user) {
      setUser(user);
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    logoutUser();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
