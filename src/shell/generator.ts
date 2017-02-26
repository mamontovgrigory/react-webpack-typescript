let id = 0;
let idPrefix = 'ui-id-';

export function generateId() {
    let oldId = id;
    id += 1;
    return idPrefix + oldId;
}