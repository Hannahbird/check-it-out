// Debug script to log environment variables
console.log('=== Environment Variables ===');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('\n=== MySQL Configuration ===');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '***set***' : 'not set');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

console.log('\n=== All MySQL-related env vars ===');
Object.keys(process.env)
  .filter(key => key.toUpperCase().includes('MYSQL') || key.toUpperCase().includes('DATABASE'))
  .forEach(key => {
    const value = key.includes('PASSWORD') ? '***hidden***' : process.env[key];
    console.log(`${key}:`, value);
  });

console.log('\n=== API Configuration ===');
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

console.log('\n=== Cloudinary Configuration ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***set***' : 'not set');

console.log('\n=== All Environment Variables (keys only) ===');
console.log(Object.keys(process.env).sort().join(', '));
