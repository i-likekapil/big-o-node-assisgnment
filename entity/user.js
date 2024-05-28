const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "user", tableName: "user", columns: {
        uniqueid: {
            type: "uuid", primary: true,
        }, title: {
            type: "varchar", nullable: true
        }, name: {
            type: "varchar"
        }, email: {
            type: "varchar"
        }, phoneNumber: {
            type: "bigint"
        }, isGraduate: {
            type: "boolean"
        }

    }
})