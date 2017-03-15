let id = 0;
let idPrefix = 'ui-id-';

class Generator {
    genId() {
        let oldId = id;
        id += 1;
        return idPrefix + oldId;
    }

    getHash(string:string) {
        var hash = 0, i, chr;
        if (string.length === 0) return hash.toString();
        for (i = 0; i < string.length; i++) {
            chr = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }
}

const generator = new Generator();

export {generator};