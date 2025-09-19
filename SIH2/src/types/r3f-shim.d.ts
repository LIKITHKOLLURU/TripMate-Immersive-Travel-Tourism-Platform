// Temporary minimal JSX shims for react-three-fiber until packages are installed
// These will be superseded by @react-three/fiber types after installation
declare namespace JSX {
  interface IntrinsicElements {
    primitive: any;
    ambientLight: any;
  }
}
