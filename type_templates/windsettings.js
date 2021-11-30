import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, useFrame, useCleanup, useWorld} = metaversefile;

const localVector = new THREE.Vector3();
const localVector2 = new THREE.Vector3();

export default e => {
  const app = useApp();
  app.appType = 'wind';
  
  // const {gifLoader} = useLoaders();
  const world = useWorld();

  const srcUrl = '${this.srcUrl}';

  e.waitUntil((async () => {
    const res = await fetch(srcUrl);
    const j = await res.json();
    let {forceFactor, direction, gravity} = j;

    const windParameters = world.getWindParameters();
    windParameters.forceFactor = forceFactor;
    windParameters.direction = new THREE.Vector3();
    windParameters.direction.fromArray(direction);
    windParameters.gravity = new THREE.Vector3();
    windParameters.gravity.fromArray(gravity);

    console.log(forceFactor, direction, gravity);

    console.log(windParameters);

  })());
  
  useFrame(() => {

  });
  
  useCleanup(() => {
    
    const windParameters = world.getWindParameters();

    windParameters.forceFactor = 0;
    windParameters.direction.set(0,0,0);
    windParameters.gravity.set(0,-1,0);

  });

  return app;
};