/* *** Aux functions *** */
const checkParam = (param) =>
    (typeof param === "string" && param.trim() !== "") ||
    (Array.isArray(param) && param.length > 0);

const formatComma = (arr) => arr.join(",");
const formatSpace = (arr) => (checkParam(arr) ? arr.join(" ") : false);

/* *** Generating SQL functions **** */
export const select = (columns) => (checkParam(columns) ? `SELECT ${formatComma(columns)}` : null);

export const from = (sources) => (checkParam(sources) ? `FROM ${formatSpace(sources)}` : null);

export const where = (selections) =>
    checkParam(selections)
        ? `WHERE ${selections
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

export const group = (columns) => (checkParam(columns) ? `GROUP BY ${formatComma(columns)}` : null);

export const having = (conditions) =>
    checkParam(conditions)
        ? `HAVING ${conditions
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
        ? `ORDER BY ${order
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
        ? `LIMIT ${limit[0]}, ${limit[1]}`
        : typeof limit === "number"
            ? `LIMIT ${limit}`
            : null;
