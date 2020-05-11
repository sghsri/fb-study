function getImageURL(type, url) {
    return `/${type}/${url}`;
}

function invalidUserID(id) {
    return id.includes('#') || id.includes('.') || id.includes('$') || id.includes('[') || id.includes(']');
}

export { getImageURL, invalidUserID };


