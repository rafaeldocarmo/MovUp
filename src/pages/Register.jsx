import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import 'primeicons/primeicons.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Nome completo deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(formData.fullName, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.error || 'Falha no cadastro' });
      }
    } catch (error) {
      setErrors({ general: 'Ocorreu um erro inesperado' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="page-container">
      <div className="min-h-screen bg-white flex align-items-center justify-content-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-black mb-2">Criar Conta</h1>
            <p className="text-black-alpha-80">Junte-se ao MovUp e comece a analisar suas corridas</p>
          </div>

          {errors.general && (
            <Message 
              severity="error" 
              text={errors.general} 
              className="mb-3 w-full"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field">
              <label htmlFor="fullName" className="block text-black font-semibold mb-2">
                Nome Completo
              </label>
              <InputText
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full ${errors.fullName ? 'p-invalid' : ''}`}
                placeholder="Digite seu nome completo"
                aria-describedby="fullName-error"
              />
              {errors.fullName && (
                <small id="fullName-error" className="p-error block mt-1">
                  {errors.fullName}
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="email" className="block text-black font-semibold mb-2">
                Email
              </label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${errors.email ? 'p-invalid' : ''}`}
                placeholder="Digite seu email"
                aria-describedby="email-error"
              />
              {errors.email && (
                <small id="email-error" className="p-error block mt-1">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="password" className="block text-black font-semibold mb-2">
                Senha
              </label>
              <Password
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                placeholder="Crie uma senha"
                aria-describedby="password-error"
                feedback={false}
                toggleMask
              />
              {errors.password && (
                <small id="password-error" className="p-error block mt-1">
                  {errors.password}
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword" className="block text-black font-semibold mb-2">
                Confirmar Senha
              </label>
              <Password
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full ${errors.confirmPassword ? 'p-invalid' : ''}`}
                placeholder="Confirme sua senha"
                aria-describedby="confirmPassword-error"
                feedback={false}
                toggleMask
              />
              {errors.confirmPassword && (
                <small id="confirmPassword-error" className="p-error block mt-1">
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            <Button
              type="submit"
              label={isLoading ? 'Criando Conta...' : 'Criar Conta'}
              icon={isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-user-plus'}
              className="w-full p-button-raised bg-black text-yellow-400 border-none"
              disabled={isLoading}
            />
          </form>

          <div className="text-center mt-4">
            <p className="text-black-alpha-80">
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="text-black font-semibold hover:underline"
              >
                Entre aqui
              </Link>
            </p>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs text-black-alpha-60">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link 
                to="/terms" 
                className="text-black hover:underline"
              >
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link 
                to="/privacy" 
                className="text-black hover:underline"
              >
                Política de Privacidade
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
