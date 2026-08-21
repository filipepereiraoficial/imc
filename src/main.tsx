import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ProvedorAuth } from '@/context/AuthContext';
import { ProvedorAviso } from '@/context/AvisoContext';
import { ProvedorDados } from '@/context/DadosContext';
import { ProvedorTema } from '@/context/TemaContext';
import './index.css';

const raiz = document.getElementById('root');
if (!raiz) throw new Error('Elemento #root não encontrado.');

createRoot(raiz).render(
  <StrictMode>
    <BrowserRouter>
      <ProvedorTema>
        <ProvedorDados>
          <ProvedorAviso>
            <ProvedorAuth>
              <App />
            </ProvedorAuth>
          </ProvedorAviso>
        </ProvedorDados>
      </ProvedorTema>
    </BrowserRouter>
  </StrictMode>,
);
