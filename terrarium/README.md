# Three JS Terrarium 

### Deployment: [three-js-terrarium.vercel.app](three-js-terrarium.vercel.app)

---
## Project Proposal

### Learning Goals

- Learn to build 3D Scene with ThreeJS (Including Movement, Camera Control, & Lighting)
- Learn how to integrate user interaction (browser events) into ThreeJS scene
	- Learn to use Webcam Input and API to collect additional user data (eyetracking + pose estimation)
- Learn to deploy FrontEnd JS site
- (Probably not, but If Time - Build a Backend Component):
	- Learn how to authenticate users, store userdata - possibly permit the upload of models (data heavy) or saving custom scenes (more lightweight - ex. store past user actions/events to restore camera location/threejs scene properties).

### Project Description

The goal of this project is to make a responsive web-based 3D scene on a single page site using threeJS. Assets for the page would be built or exported to GLTF using Blender, or whole scenes being built with PolygonJS.
- At a minimum, the user should be able to look around and navigate the scene using keyboard or mouse input.
-  Ideally, the user's view would be constrained like a window, with user's distance relative to the screen changing the camera perspective in the scene. Additionally, user gaze (where on the screen they are looking) may be used for navigation (moving camera within the scene).
-  Reach goals likely to be completed outside the 3-week capstone window would include authentication and persistent data storage - allowing users login, save their position or even upload or manipulate models.

### Technologies
#### Main Technologies:
- JS / React (Front End)
- Vercel (Deployment)
- ThreeJS library
- React-Three-Fiber
- WebGazer API
- Facemesh API
- (Optional) OpenCV for pose tracking 

#### Additional Technologies:
- Blender
- Photoshop


### MVP Feature Set

1.  Deploy Front End Website that recognizes and reports movements/and or facial features of user
	- WebGazer for Eye tracking
    - (Optional) OpenCV for pose tracking 
    - (Optional) dashboard of tracked values
2. ThreeJS scene rendering 3D Objects, lighting
	-  Interactive/responsive elements (keyboard input)
	-  (Optional) Eye-responsive camera view
  
- Deployed Frontend ThreeJS Scene
	- 3D Objects & lighting Rendering
	- Camera position responsive to manual user input (keyboard)
	- Camera view responsive to webcam input (via WebGazer Eye Position or OpenCV pose est.)
