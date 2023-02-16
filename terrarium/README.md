# Three JS Terrarium 

### Deployment: [three-js-terrarium.vercel.app](three-js-terrarium.vercel.app)

---
## Project Description

A ThreeJS Demo Scene with hands-free 3D navigation. This project serves as a proof-of-concept for ML face tracking as an intuitive camera controller for 3D environments. Potential applications include hands-free CAD orbit controls and game navigation.

## Current Functionality

Controller currently responds accurately to L/R, Up/Down & FWD/BWD head movements. These are used to control Panning, Zoom, and Field of View.
Eyegaze predictions from Webgazer are currently too innaccurate to be used for mouse-less raytracing.

### Camera control modes
- Built-In R3F manual Orbit Controller (Click & Drag / Scroll to Zoom)
- Inspection Mode (Fixed focus, Face-driven position & zoom) 
- Navigation Mode (Fixed position, Face-driven rotation)

### ThreeJS Scene features
- Rendering 3D models, Environment, lighting, etc.
- Animation, physics, click-event & keyboard responses

### UI & Controls
#### Keyboard Controlss
- Click to focus on object
- Arrow Keys/WASD to move
- Spacebar to flip view 180deg
- Shift to switch to mouse control
- [X] to reset to default view
- [C] to enable pivot controls
- [R]  to reset scene

#### Panel Controls
- Full-screen mode
- Pause/start face tracking
- Show & reset face tracking
- Image stabilization filter settings
- Show gaze tracking 
- Show normalized sensor data

- View Mode Button (Inspect vs Navigate)

## Dependencies
This demo is built using the Webgazer Library for facial tracking, the KalmanJS library for camera stabilization and responsiveness, and ThreeJS + R3F libraries for 3D scene creation.

### Development Technologies
#### Main Technologies
- JS / React (Front End)
- ThreeJS library
- React-Three-Fiber
- KalmanJS
- WebGazer API
- Facemesh API
- Vercel (Deployment)

#### Support Technologies
- Blender
- Photoshop
- gltfjsx

### Full dependency list

#### Engines
"node": "18.14.0",
"npm": "8.19.3"

#### General dependencies
"@mui/material": "^5.11.7",
"@react-three/cannon": "^6.5.2",
"@react-three/drei": "^9.56.1",
"@react-three/fiber": "^8.10.1",
"@react-three/rapier": "^0.9.0",
"kalmanjs": "^1.1.0",
"leva": "^0.9.34", // for debugging only
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-full-screen": "^1.1.1",
"react-scripts": "5.0.1",
"three": "^0.148.0"

Webgazer script source: (https://webgazer.cs.brown.edu/webgazer.js?)
- (current webgazer npm package is failing, used script loading instead)

## Running Project
ThreeJS Terrarium is a pure react app. To run, 
1. `clone https://github.com/FrancescaFr/ThreeJSTerrarium.git`
2. `cd terrarium`
3. `npm install`
4. `npm start` or `npm build`
