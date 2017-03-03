let id = 0;
let idPrefix = 'ui-id-';

class Generator{
    genId() {
        let oldId = id;
        id += 1;
        return idPrefix + oldId;
    }
}

const generator = new Generator();

export {generator};