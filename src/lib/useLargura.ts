import { useEffect, useRef, useState } from 'react';

/**
 * Mede a largura real do container.
 *
 * Graficos sao desenhados em pixels reais em vez de escalar um viewBox fixo:
 * assim a tipografia dos eixos mantem o mesmo tamanho no celular e no desktop.
 */
export function useLargura<T extends HTMLElement>(inicial = 640) {
  const ref = useRef<T>(null);
  const [largura, setLargura] = useState(inicial);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;
    const observador = new ResizeObserver(([entrada]) => {
      const w = entrada.contentRect.width;
      if (w > 0) setLargura(w);
    });
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return { ref, largura };
}
