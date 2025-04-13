import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from '@xyflow/react';

export default function CustomEdge({ id, source, target, sourceX, sourceY, targetX, targetY, style }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // Verifica si source o target tiene "control" en su ID
    //const isControlEdge = source.includes("control") || target.includes("control");
    const isControlEdge = source.includes("control") || source.includes("aluControl");

    // Modifica el estilo del edge si está conectado a un nodo "control"
    const edgeStyle = isControlEdge ? { ...style, stroke: "orange" } : style;


    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={edgeStyle}
            />
            <EdgeLabelRenderer>
                <button
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                    onClick={() => {
                        setEdges((es) => es.filter((e) => e.id !== id));
                    }}
                >
                    🗑️
                </button>
            </EdgeLabelRenderer>
        </>
    );
}
