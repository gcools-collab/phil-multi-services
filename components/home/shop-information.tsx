import { ExternalLink, MapPin, Phone, Store } from "lucide-react";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";
import { philPhotos } from "@/data/photos";

function MapMedia() {
  if (business.googleMapsEmbedUrl) {
    return (
      <div className="map-embed">
        <iframe
          src={business.googleMapsEmbedUrl}
          title="Carte Google Maps de Phil Multi-Services"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <PhotoFrame
      className="shop-photo"
      src={philPhotos.shop.src}
      alt={philPhotos.shop.alt}
      sizes="(max-width: 900px) 92vw, 38vw"
    >
      <figcaption className="photo-caption">
        <Store size={20} aria-hidden="true" />
        <span>
          <strong>La boutique</strong>
          Place du 11 Novembre, Saint-Amand-les-Eaux
        </span>
      </figcaption>
    </PhotoFrame>
  );
}

export function ShopInformation() {
  return (
    <section className="section shop-section">
      <Container className="shop-grid">
        <div>
          <p className="eyebrow">La boutique à Saint-Amand-les-Eaux</p>
          <h2>Votre boutique au cœur de Saint-Amand-les-Eaux.</h2>
          <address className="shop-address">
            <MapPin aria-hidden="true" />
            <span>
              <strong>{business.address}</strong>
              {business.postalCode} {business.city}
            </span>
          </address>
          <div className="shop-actions">
            <a className="shop-phone" href={business.phoneHref}>
              <Phone size={20} aria-hidden="true" /> {business.phone}
            </a>
            <a className="button button-light" href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Voir sur Google Maps <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
          <dl className="shop-hours">
            {business.hours.map((item) => (
              <div key={item.day}>
                <dt>{item.day}</dt>
                <dd>{item.shop}</dd>
              </div>
            ))}
          </dl>
        </div>
        <MapMedia />
      </Container>
    </section>
  );
}
