// log.js
import geoip from 'geoip-lite';

import { execute } from "../utils/query.js";

export const requestLogger = (req, res, next) => {
    const user = req.user.uid || '0';
    const resource = req.originalUrl;
    const params = JSON.stringify({ params: req.params, body: req.body });
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const geo = JSON.stringify(geoip.lookup(ip) || {});
    const headers = JSON.stringify(req.headers);
    const sql = `
        INSERT INTO log (usuario, recurso, parametros, ip, geo_info, headers)
        VALUES ('${user}', '${resource}', '${params}', '${ip}', '${geo}', '${headers}');
    `;
    execute(sql);
    next();
}
