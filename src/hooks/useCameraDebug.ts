import { useEffect } from "react";
import * as THREE from "three";

export function useCameraDebug(camera: THREE.Camera) {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("POSITION", {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });

      console.log("ROTATION", {
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z,
      });
    }, 100);

    return () => clearInterval(interval);
  }, [camera]);
}