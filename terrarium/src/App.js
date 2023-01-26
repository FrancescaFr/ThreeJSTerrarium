import './App.css';
import { Canvas } from '@react-three/fiber'
import World from './components/world';

function App() {
  return (
    <div id="scene-container">
      <Canvas>
        <World />
      </Canvas>
    </div>
  );
}

export default App;
