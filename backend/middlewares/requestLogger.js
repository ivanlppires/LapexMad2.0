// log.js
import geoip from 'geoip-lite';

import { connection } from '../config/db.js';

export function requestLogger(req, res, next) {

    const user = req.headers['user'] || 'Unknown User';
    const resource = req.originalUrl;
    const date = new Date().toISOString();
    const ip = req.ip;
    const geo = geoip.lookup(ip) || {};

    const sql = `
        INSERT INTO log (usuario, recurso, data, ip, geo_info)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [user, resource, date, ip, JSON.stringify(geo)];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error inserting log into database:', error);
        } else {
            console.log('Log entry added to database');
        }
    });

    next();
}
