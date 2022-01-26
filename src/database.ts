import { Pool } from 'pg';

const connectionString = 'postgres://pfebmzxh:m0LhBmi3s4tV-VYLuykpZNigUnGv1m3b@kesavan.db.elephantsql.com/pfebmzxh';

const db = new Pool({ connectionString });

export default db;
