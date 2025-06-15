import { useState, useCallback } from "react";

export const useHandleConnectionList = () => {
    const [handleConnectionList, setHandleConnectionList] = useState(initialConnectionList);

    const addConnection = useCallback((originNodeId, originHandleId, destinyNodeId, destinyHandleId, assignedBits) => {
        setHandleConnectionList(prev => [
            ...prev,
            { originNodeId, originHandleId, destinyNodeId, destinyHandleId, assignedBits }
        ]);
        console.log("Added connection:", { originNodeId, originHandleId, destinyNodeId, destinyHandleId, assignedBits });
        console.log("Updated connection list:", handleConnectionList);
    }, [handleConnectionList]);

    const removeConnection = useCallback((originNodeId, originHandleId, destinyNodeId, destinyHandleId) => {
        setHandleConnectionList(prev => {
            const newList = prev.filter(connection =>
                connection.originNodeId !== originNodeId ||
                connection.originHandleId !== originHandleId ||
                connection.destinyNodeId !== destinyNodeId ||
                connection.destinyHandleId !== destinyHandleId
            );
            console.log("Removed connection:", { originNodeId, originHandleId, destinyNodeId, destinyHandleId });
            console.log("Updated connection list:", newList);
            return newList;
        });
    }, []);

    const setHandleConnectionAssignedBits = useCallback((originNodeId, originHandleId, destinyNodeId, destinyHandleId, newAssignedBits) => {
        setHandleConnectionList(prev => {
            // Buscar la conexión que coincide con los identificadores
            const updatedList = prev.map(connection => {
                if (
                    connection.originNodeId === originNodeId &&
                    connection.originHandleId === originHandleId &&
                    connection.destinyNodeId === destinyNodeId &&
                    connection.destinyHandleId === destinyHandleId
                ) {
                    // Si coincide, actualizamos el valor de assignedBits
                    return {
                        ...connection,
                        assignedBits: newAssignedBits
                    };
                }
                return connection; // Si no coincide, dejamos la conexión tal cual
            });

            console.log("Updated connection bits:", { originNodeId, originHandleId, destinyNodeId, destinyHandleId, newAssignedBits });
            console.log("Updated connection list:", updatedList);
            return updatedList;
        });
    }, []);

    return { handleConnectionList, addConnection, removeConnection, setHandleConnectionAssignedBits };
};

const initialConnectionList = [
    {
        originNodeId: "control",
        originHandleId: "pc-write-cond-output",
        destinyNodeId: "and",
        destinyHandleId: "input2",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "pc-write-output",
        destinyNodeId: "or",
        destinyHandleId: "input2",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "i-or-d-output",
        destinyNodeId: "multiplexer1",
        destinyHandleId: "control-input-multiplexer1",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "mem-read-output",
        destinyNodeId: "memory",
        destinyHandleId: "control-read-input-memory",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "mem-write-output",
        destinyNodeId: "memory",
        destinyHandleId: "control-write-input-memory",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "mem-to-reg-output",
        destinyNodeId: "multiplexer3",
        destinyHandleId: "control-input-multiplexer3",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "i-r-write-output",
        destinyNodeId: "instructionRegister",
        destinyHandleId: "control-input-instructionRegister",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "pc-source-output",
        destinyNodeId: "multiplexer6",
        destinyHandleId: "control-input-multiplexer6",
        assignedBits: 2
    },
    {
        originNodeId: "control",
        originHandleId: "alu-op-output",
        destinyNodeId: "aluControl",
        destinyHandleId: "control-input-aluControl",
        assignedBits: 2
    },
    {
        originNodeId: "control",
        originHandleId: "alu-src-b-output",
        destinyNodeId: "multiplexer5",
        destinyHandleId: "control-input-multiplexer5",
        assignedBits: 2
    },
    {
        originNodeId: "control",
        originHandleId: "alu-src-a-output",
        destinyNodeId: "multiplexer4",
        destinyHandleId: "control-input-multiplexer4",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "reg-write-output",
        destinyNodeId: "register",
        destinyHandleId: "control-input-register",
        assignedBits: 1
    },
    {
        originNodeId: "control",
        originHandleId: "reg-dst-output",
        destinyNodeId: "multiplexer2",
        destinyHandleId: "control-input-multiplexer2",
        assignedBits: 1
    },
    {
        originNodeId: "and",
        originHandleId: "output",
        destinyNodeId: "or",
        destinyHandleId: "input1",
        assignedBits: 1
    },
    {
        originNodeId: "or",
        originHandleId: "output",
        destinyNodeId: "pc",
        destinyHandleId: "control-input-pc",
        assignedBits: 1
    },
    {
        originNodeId: "pc",
        originHandleId: "output-pc",
        destinyNodeId: "multiplexer1",
        destinyHandleId: "0-multiplexer1",
        assignedBits: 32
    },
    {
        originNodeId: "pc",
        originHandleId: "output-pc",
        destinyNodeId: "multiplexer4",
        destinyHandleId: "0-multiplexer4",
        assignedBits: 32
    },
    {
        originNodeId: "pc",
        originHandleId: "output-pc",
        destinyNodeId: "multiplexer6",
        destinyHandleId: "2-multiplexer6",
        assignedBits: 4
    },
    {
        originNodeId: "multiplexer1",
        originHandleId: "output-multiplexer1",
        destinyNodeId: "memory",
        destinyHandleId: "direction-input-memory",
        assignedBits: 32
    },
    {
        originNodeId: "memory",
        originHandleId: "output-memory",
        destinyNodeId: "instructionRegister",
        destinyHandleId: "input-instructionRegister",
        assignedBits: 32
    },
    {
        originNodeId: "memory",
        originHandleId: "output-memory",
        destinyNodeId: "memoryDataRegister",
        destinyHandleId: "input-memoryDataRegister",
        assignedBits: 32
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[31-26]-instructionRegister",
        destinyNodeId: "control",
        destinyHandleId: "input",
        assignedBits: 6
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[25-21]-instructionRegister",
        destinyNodeId: "shiftLeftInstructionRegister",
        destinyHandleId: "input-shiftLeft2",
        assignedBits: 5
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[25-21]-instructionRegister",
        destinyNodeId: "shiftLeftInstructionRegister",
        destinyHandleId: "input-shiftLeft2",
        assignedBits: 5
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[15-0]-instructionRegister",
        destinyNodeId: "shiftLeftInstructionRegister",
        destinyHandleId: "input-shiftLeft2",
        assignedBits: 16
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[25-21]-instructionRegister",
        destinyNodeId: "shiftLeftInstructionRegister",
        destinyHandleId: "read-reg-1-input-register",
        assignedBits: 5
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[20-16]-instructionRegister",
        destinyNodeId: "register",
        destinyHandleId: "read-reg-2-input-register",
        assignedBits: 5
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[20-16]-instructionRegister",
        destinyNodeId: "multiplexer2",
        destinyHandleId: "0-multiplexer2",
        assignedBits: 5
    },
    {
        originNodeId: "shiftLeftInstructionRegister",
        originHandleId: "output-shiftLeft",
        destinyNodeId: "multiplexer6",
        destinyHandleId: "2-multiplexer6",
        assignedBits: 28
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[15-0]-instructionRegister",
        destinyNodeId: "multiplexer2",
        destinyHandleId: "1-multiplexer2",
        assignedBits: 5
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[15-0]-instructionRegister",
        destinyNodeId: "signExtend",
        destinyHandleId: "input-signExtend",
        assignedBits: 16
    },
    {
        originNodeId: "instructionRegister",
        originHandleId: "output-[15-0]-instructionRegister",
        destinyNodeId: "aluControl",
        destinyHandleId: "input-aluControl",
        assignedBits: 5
    },
    {
        originNodeId: "aluControl",
        originHandleId: "output-aluControl",
        destinyNodeId: "alu",
        destinyHandleId: "alu-operation-input-alu",
        assignedBits: 4
    },
    {
        originNodeId: "multiplexer2",
        originHandleId: "output-multiplexer2",
        destinyNodeId: "register",
        destinyHandleId: "write-reg-input-register",
        assignedBits: 5
    },
    {
        originNodeId: "register",
        originHandleId: "read-data-1-output-register",
        destinyNodeId: "letterA",
        destinyHandleId: "input-letter",
        assignedBits: 32
    },
    {
        originNodeId: "register",
        originHandleId: "read-data-2-output-register",
        destinyNodeId: "letterB",
        destinyHandleId: "input-letter",
        assignedBits: 32
    },
    {
        originNodeId: "letterB",
        originHandleId: "output-letter",
        destinyNodeId: "memory",
        destinyHandleId: "data-input-memory",
        assignedBits: 32
    },
    {
        originNodeId: "signExtend",
        originHandleId: "output-signExtend",
        destinyNodeId: "shiftLeftSignExtend",
        destinyHandleId: "input-shiftLeft2",
        assignedBits: 32
    },
    {
        originNodeId: "memoryDataRegister",
        originHandleId: "output-memoryDataRegister",
        destinyNodeId: "multiplexer3",
        destinyHandleId: "1-multiplexer3",
        assignedBits: 32
    },
    {
        originNodeId: "letterA",
        originHandleId: "output-letter",
        destinyNodeId: "multiplexer4",
        destinyHandleId: "1-multiplexer4",
        assignedBits: 32
    },
    {
        originNodeId: "letterB",
        originHandleId: "output-letter",
        destinyNodeId: "multiplexer5",
        destinyHandleId: "0-multiplexer5",
        assignedBits: 32
    },
    {
        originNodeId: "signExtend",
        originHandleId: "output-signExtend",
        destinyNodeId: "multiplexer5",
        destinyHandleId: "2-multiplexer5",
        assignedBits: 32
    },
    {
        originNodeId: "shiftLeftSignExtend",
        originHandleId: "output-shiftLeft2",
        destinyNodeId: "multiplexer5",
        destinyHandleId: "3-multiplexer5",
        assignedBits: 32
    },
    {
        originNodeId: "number1",
        originHandleId: "output-number",
        destinyNodeId: "multiplexer5",
        destinyHandleId: "1-multiplexer5",
        assignedBits: 32
    },
    {
        originNodeId: "multiplexer4",
        originHandleId: "output-multiplexer4",
        destinyNodeId: "alu",
        destinyHandleId: "inputA-alu",
        assignedBits: 32
    },
    {
        originNodeId: "multiplexer5",
        originHandleId: "output-multiplexer5",
        destinyNodeId: "alu",
        destinyHandleId: "inputB-alu",
        assignedBits: 32
    },
    {
        originNodeId: "alu",
        originHandleId: "output-alu",
        destinyNodeId: "multiplexer6",
        destinyHandleId: "0-multiplexer6",
        assignedBits: 32
    },
    {
        originNodeId: "alu",
        originHandleId: "output-alu",
        destinyNodeId: "memory",
        destinyHandleId: "address-input-memory",
        assignedBits: 32
    },
    {
        originNodeId: "aluExit",
        originHandleId: "output-aluExit",
        destinyNodeId: "multiplexer6",
        destinyHandleId: "1-multiplexer6",
        assignedBits: 32
    },
    {
        originNodeId: "aluExit",
        originHandleId: "output-aluExit",
        destinyNodeId: "multiplexer1",
        destinyHandleId: "1-multiplexer1",
        assignedBits: 32
    },
    {
        originNodeId: "aluExit",
        originHandleId: "output-aluExit",
        destinyNodeId: "multiplexer3",
        destinyHandleId: "0-multiplexer3",
        assignedBits: 32
    },
    {
        originNodeId: "multiplexer6",
        originHandleId: "output-multiplexer6",
        destinyNodeId: "pc",
        destinyHandleId: "input-pc",
        assignedBits: 32
    }
];

