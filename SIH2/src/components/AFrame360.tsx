import 'aframe';

export default function AFrame360({ src }: { src: string }) {
  return (
    <div style={{ height: '100%' }}>
      <a-scene embedded vr-mode-ui="enabled: true" style={{ height: '100%' }}>
        <a-assets>
          <img id="panorama" src={src} alt="panorama" />
        </a-assets>
        <a-sky src="#panorama" rotation="0 -90 0"></a-sky>
        <a-entity camera look-controls position="0 1.6 0">
          <a-cursor rayOrigin="mouse" material="color: red"></a-cursor>
        </a-entity>
      </a-scene>
    </div>
  );
}
