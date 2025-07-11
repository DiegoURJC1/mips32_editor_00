import { useCallback, useRef, useState, useEffect } from 'react';
import {
    BaseEdge,
    BuiltInNode,
    useReactFlow,
    useStore,
    type Edge,
    type EdgeProps,
    type XYPosition,
} from '@xyflow/react';
import { useThemeContext } from '../../contexts/ThemeContext';
import { ControlPoint, type ControlPointData } from './ControlPoint';
import { getPath, getControlPoints } from './path';
import { Algorithm, COLORS } from './constants';

const useIdsForInactiveControlPoints = (points: ControlPointData[]) => {
    const ids = useRef<string[]>([]);

    if (ids.current.length === points.length) {
        return points.map((point, i) => point.id ? point : (
            { ...point, id: ids.current[i] }));
    } else {
        ids.current = [];

        return points.map((point, i) => {
            if (!point.id) {
                const id = window.crypto.randomUUID();
                ids.current[i] = id;
                return { ...point, id: id };
            } else {
                ids.current[i] = point.id;
                return point;
            }
        });
    }
};

export type EditableEdge = Edge<{
    algorithm?: Algorithm;
    points: ControlPointData[];
}>;

export function EditableEdgeComponent(
    {
        id,
        selected,
        source,
        sourceX,
        sourceY,
        sourcePosition,
        target,
        targetX,
        targetY,
        targetPosition,
        markerEnd,
        markerStart,
        style,
        data = { points: [] },

        animated,
        selectable,
        deletable,
        sourceHandleId,
        targetHandleId,

        ...restDelegated
    }: EdgeProps<EditableEdge>) {
    const sourceOrigin = { x: sourceX, y: sourceY } as XYPosition;
    const targetOrigin = { x: targetX, y: targetY } as XYPosition;
    const { theme } = useThemeContext();

    const { getNode } = useReactFlow<BuiltInNode, EditableEdge>();
    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    const isControlEdge = sourceNode?.id === 'control';
    const isAluControlEdge = sourceNode?.id === 'aluControl' || targetNode?.id === 'aluControl';

    const [isMismatch, setIsMismatch] = useState(false); // Nuevo estado para el cambio de color

    // Función para comparar los bits entre los handles de los edges
    const compareBits = (sourceNode, targetNode) => {
        const sourceHandle = sourceNode?.data?.handles?.find(h => h.id === sourceHandleId);
        const targetHandle = targetNode?.data?.handles?.find(h => h.id === targetHandleId);

        if (sourceHandle && targetHandle && sourceHandle.bits != null && targetHandle.bits != null) {
            return sourceHandle.bits !== targetHandle.bits;
        }

        return false; // Si no tienen bits o alguno es nulo, no hay desajuste
    };
    /*
    useEffect(() => {
        // Verificamos si los bits de los handles en ambos nodos coinciden
        const mismatch = compareBits(sourceNode, targetNode);
        setIsMismatch(mismatch); // Actualizamos el estado si hay desajuste

    }, [sourceNode, targetNode, sourceHandleId, targetHandleId]);*/

    const CONTROL_COLOR = 'orange'; // pon aquí el color hexadecimal real de var(--control-color)
    const NEGATION_COLOR = '#ec4949'; // o el rojo que uses para negation-color

    const edgeColor = isMismatch
        ? NEGATION_COLOR
        : (isControlEdge || isAluControlEdge
            ? CONTROL_COLOR
            : COLORS[data.algorithm ?? Algorithm.BezierCatmullRom]);

    const { setEdges } = useReactFlow<BuiltInNode, EditableEdge>();
    const shouldShowPoints = useStore((store) => {
        const sourceNode = store.nodeLookup.get(source)!;
        const targetNode = store.nodeLookup.get(target)!;
        return selected || sourceNode.selected || targetNode.selected;
    });

    const setControlPoints = useCallback(
        (update: (points: ControlPointData[]) => ControlPointData[]) => {
            setEdges((edges) =>
                edges.map((e) => {
                    if (e.id !== id) return e;
                    if (!isEditableEdge(e)) return e;

                    const points = e.data?.points ?? [];
                    const data = { ...e.data, points: update(points) };

                    return { ...e, data };
                })
            );
        },
        [id, setEdges]
    );

    const pathPoints = [sourceOrigin, ...data.points, targetOrigin];
    const controlPoints = getControlPoints(pathPoints, data.algorithm, {
        fromSide: sourcePosition,
        toSide: targetPosition,
    });
    const path = getPath(pathPoints, data.algorithm, {
        fromSide: sourcePosition,
        toSide: targetPosition,
    });

    const controlPointsWithIds = useIdsForInactiveControlPoints(controlPoints);


    const shadowColor = theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'  // sombra clara para fondo oscuro
        : 'rgba(0, 0, 0, 0.2)';       // sombra oscura para fondo claro

    const shadowFilter = selected ? `drop-shadow(0 0 4px ${shadowColor})` : 'none';

    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                {...restDelegated}
                markerStart={markerStart}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    stroke: edgeColor,
                    strokeWidth: selected ? 4 : 2,
                    filter: shadowFilter,
                    transition: 'stroke-width 0.2s, filter 0.2s',
                }}
            />

            {shouldShowPoints &&
                controlPointsWithIds.map((point, index) => (
                    <ControlPoint
                        key={point.id}
                        index={index}
                        setControlPoints={setControlPoints}
                        color={edgeColor}
                        {...point}
                    />
                ))}
        </>
    );
}

const isEditableEdge = (edge: Edge): edge is EditableEdge =>
    edge.type === 'editable-edge';
