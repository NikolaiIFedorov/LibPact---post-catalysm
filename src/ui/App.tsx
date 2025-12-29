import "./App.css";

interface LayerProps {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  x?: number;
  y?: number;
  layer: number;
}

const Layer = ({ width, height, x = 0, y = 0, layer }: LayerProps) => {
  const shade = layer * 10 + 10;
  const radius = 40 - 10 * layer;

  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: `hsl(0, 0%, ${shade}%)`,
        position: `fixed`,
        top: y,
        left: x,
        borderRadius: `${radius}px`,
      }}
    />
  );
};

function App() {
  return (
    <>
      <Layer width={60} height={680} x={20} y={20} layer={1}></Layer>
      <Layer width={300} height={680} x={100} y={20} layer={1}></Layer>
      <Layer width={700} height={100} x={420} y={600} layer={1}></Layer>
      <Layer width={700} height={200} x={420} y={380} layer={1}></Layer>
      <Layer width={700} height={340} x={420} y={20} layer={1}></Layer>
    </>
  );
}

export default App;
