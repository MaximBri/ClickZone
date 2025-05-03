import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

/**
 * Функция отвечает за поднятие в DOM-дереве всплывающих окнах (признак хорошего тона). Для этого создаётся элемент div, в который будет помещён требуемый компонент
 * @param {PortalProps} children - компонент, который нужно поднять на более высокий уровень (хороший стиль)
 */
export const Portal = ({ children }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalContainer = document.createElement("div");
    portalContainer.id = "portal-root";
    document.body.appendChild(portalContainer);
    setContainer(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, []);

  if (!container) return null;

  return createPortal(children, container);
};
