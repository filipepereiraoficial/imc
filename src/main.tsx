import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { App } from './App';
import { ProvedorAuth } from '@/context/AuthContext';
import { ProvedorAviso } from '@/context/AvisoContext';
import { ProvedorDados } from '@/context/DadosContext';
import { ProvedorServidor } from '@/context/ServidorContext';
import { ProvedorTema } from '@/context/TemaContext';
import './index.css';

const raiz = document.getElementById('root');
if (!raiz) throw new Error('Elemento #root não encontrado.');

/**
 * Em uma hospedagem comum o roteamento e por caminho. Quando a aplicacao e
 * distribuida como pagina unica — sem servidor que responda /hoje, /feed etc. —
 * o roteamento passa a ser por hash. Ver scripts/pagina-unica.mjs.
 */
const Roteador = import.meta.env.VITE_PAGINA_UNICA === '1' ? HashRouter : BrowserRouter;

createRoot(raiz).render(
  <StrictMode>
    <Roteador>
      <ProvedorTema>
        <ProvedorServidor>
          <ProvedorDados>
            <ProvedorAviso>
              <ProvedorAuth>
                <App />
              </ProvedorAuth>
            </ProvedorAviso>
          </ProvedorDados>
        </ProvedorServidor>
      </ProvedorTema>
    </Roteador>
  </StrictMode>,
);
