
export const validateConnection = (connection) => {
    // Evita conexiones al mismo nodo
    return connection.source !== connection.target;
};