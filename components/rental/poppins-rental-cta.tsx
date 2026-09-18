"use client";

import { Phone, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { business } from "@/data/business";

const DESKTOP_MEDIA_QUERY = "(min-width: 901px)";

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

type PoppinsRentalCtaProps = {
  href: string;
  qrSvg: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export function PoppinsRentalCta({
  href,
  qrSvg,
  className,
  ariaLabel,
  children,
}: PoppinsRentalCtaProps) {
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    if (!isDesktop) dialogRef.current?.close();
  }, [isDesktop]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop) return;
    event.preventDefault();
    openModal();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className="poppins-cta">
      <a
        className={className}
        href={href}
        aria-label={ariaLabel}
        aria-haspopup={isDesktop ? "dialog" : undefined}
        data-poppins-cta="true"
        onClick={handleClick}
      >
        {children}
      </a>
      <dialog
        ref={dialogRef}
        className="poppins-dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={handleBackdropClick}
      >
        <div className="poppins-dialog-inner">
          <button
            className="poppins-dialog-close"
            type="button"
            aria-label="Fermer"
            onClick={closeModal}
          >
            <X size={20} aria-hidden="true" />
          </button>
          <h2 id={titleId}>Retrouvez les locations de Philippe sur Poppins</h2>
          <p id={descriptionId}>
            Scannez ce QR code avec votre téléphone pour ouvrir directement Phil Multi-Services dans
            Poppins.
          </p>
          <div
            className="poppins-qr"
            role="img"
            aria-label="QR code Poppins vers le profil Phil Multi-Services"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p className="poppins-dialog-note">
            Vous n’avez pas encore Poppins ? L’application vous sera proposée avant d’accéder au
            profil Phil Multi-Services.
          </p>
          <a className="button button-secondary" href={business.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            Appeler Philippe
          </a>
        </div>
      </dialog>
    </div>
  );
}
