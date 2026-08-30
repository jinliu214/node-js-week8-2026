const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Course",
  tableName: "COURSE",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    // name varchar(100) 必填
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    // description text 必填
    description: {
      type: "text",
      nullable: false,
    },
    // start_at timestamp 必填
    start_at: {
      type: "timestamp",
      nullable: false,
    },
    // end_at timestamp 必填
    end_at: {
      type: "timestamp",
      nullable: false,
    },
    // max_participants integer 必填
    max_participants: {
      type: "integer",
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
  relations: {
    // user_id → USER（開課教練）
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
    },
    // skill_id → SKILL（課程技能）
    skill: {
      type: "many-to-one",
      target: "Skill",
      joinColumn: {
        name: "skill_id",
      },
    },
  },
});
