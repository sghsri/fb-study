let DEBUG = true;

if (DEBUG)
    console.log('DEBUG FLAG SET IN CONFIG.JS, ASSUMING THAT BACKEND IS LOCALHOST')
let config = {
    "backend_base": DEBUG ? "http://localhost:5000" : "https://www.stroudresearch.net"
}


export default config;
