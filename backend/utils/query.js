import createConnection from '../config/db.js';

const connection = await createConnection();

/* *** Aux functions *** */
const checkParam = (param) =>
    (typeof param === "string" && param.trim() !== "") ||
    (Array.isArray(param) && param.length > 0);

const formatComma = (arr) => arr.join(", ");
const formatSpace = (arr) => arr.join(" ");

/* *** Generating SQL functions *** */
export const select = (columns) => {
    if (!checkParam(columns)) return "";
    const formattedColumns = Array.isArray(columns) ? columns : [columns];
    return `SELECT ${formatComma(formattedColumns)}`;
};

export const from = (sources) => {
    if (!checkParam(sources)) return "";
    const formattedSources = Array.isArray(sources) ? sources : [sources];
    return ` FROM ${formatSpace(formattedSources)}`;
};

export const where = (selections) =>
    checkParam(selections)
        ? ` WHERE ${selections
            .map((condition) =>
                Object.entries(condition || {})
                    .map(([key, value]) =>
                        Array.isArray(value)
                            ? `${key} IN (${value.map((v) => (typeof v === "string" ? `'${v}'` : v)).join(", ")})`
                            : `${key} = ${typeof value === "string" ? `'${value}'` : value}`
                    )
                    .join(" AND ")
            )
            .filter(Boolean)
            .join(" AND ")}`
        : null;

export const group = (columns) => (checkParam(columns) ? ` GROUP BY ${formatComma(columns)}` : null);

export const having = (conditions) =>
    checkParam(conditions)
        ? ` HAVING ${conditions
            .map((cond) =>
                Object.entries(cond || {})
                    .map(([key, value]) =>
                        Array.isArray(value)
                            ? `${key} IN (${value.map((v) => (typeof v === "string" ? `'${v}'` : v)).join(", ")})`
                            : `${key} = ${typeof value === "string" ? `'${value}'` : value}`
                    )
                    .join(" AND ")
            )
            .filter(Boolean)
            .join(" AND ")}`
        : null;

export const order = (order) =>
    checkParam(order)
        ? ` ORDER BY ${order
            .map((o) =>
                Object.entries(o || {})
                    .map(([col, dir]) =>
                        ["ASC", "DESC"].includes(String(dir).toUpperCase()) ? `${col} ${dir.toUpperCase()}` : col
                    )
                    .join(", ")
            )
            .filter(Boolean)
            .join(", ")}`
        : null;

export const limit = (limit) =>
    Array.isArray(limit) && limit.length === 2
        ? ` LIMIT ${limit[0]}, ${limit[1]}`
        : typeof limit === "number"
            ? `LIMIT ${limit}`
            : null;


export const execute = async (sql) => {
    try {
        const [rows] = await connection.execute(sql);
        return rows;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error; // Re-throw the error to handle it upstream if needed
    }
};
