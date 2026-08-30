const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "USER",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    // name varchar(50) 必填
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    // email varchar(320) 必填且唯一
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true,
    },
    // role varchar(20) 必填
    role: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    // created_at
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    // updated_at
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
