export class Component {
    deserialize(data) {
        if (data == undefined)
            throw Error('No Component data');
    }
    serialize(optimize = true) { return {}; }
    toString() {
        let data = this.serialize(false);
        if (data == undefined)
            return '(undefined)';
        return JSON.stringify(data, undefined, ' ')
            .replace(/\n/g, ' ').replace(/  /g, ' ');
    }
}
//# sourceMappingURL=Component.js.map