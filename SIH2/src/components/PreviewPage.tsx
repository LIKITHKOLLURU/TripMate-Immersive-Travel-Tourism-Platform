import { useParams, useNavigate } from 'react-router-dom';
import { PLACES } from '../data/places';
import { lazy, Suspense } from 'react';

// Lazy-load to prevent A-Frame and React-Three-Fiber being bundled together
const AFrame360 = lazy(() => import('./AFrame360'));
const ModelViewer = lazy(() => import('./ModelViewer'));

export default function PreviewPage() {
  const { placeId } = useParams();
  const place = PLACES[placeId as keyof typeof PLACES];
  const navigate = useNavigate();

  if (!place) return <div style={{ padding: 20 }}>Place not found</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }}>← Back</button>
        <div>
          <h2 style={{ margin: 0 }}>{place.name}</h2>
          <p style={{ margin: 0, color: '#6b7280' }}>{place.desc}</p>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {place.type === 'streetview' ? (
          <div style={{ height: '100%', width: '100%' }}>
            <iframe
              src={place.file}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <Suspense fallback={<div style={{ padding: 16 }}>Loading immersive preview…</div>}>
            {place.type === '360' ? (
              <AFrame360 src={place.file} />
            ) : (
              <ModelViewer src={place.file} />
            )}
          </Suspense>
        )}
      </main>

      <footer style={{ padding: '10px', textAlign: 'center' }}>
        <button onClick={() => alert('Booking flow here!')} style={{ padding: '8px 14px', borderRadius: 8, background: '#2563eb', color: 'white' }}>Book / Add to Itinerary</button>
      </footer>
    </div>
  );
}
