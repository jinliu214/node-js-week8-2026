/**
 * 任務 4：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require("./data-source");

/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
  for (const name of ["Course", "User", "Skill"]) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute();
    }
  }
}

async function main() {
  await dataSource.initialize();
  await clearAll();

  // ======================================================================
  // TODO：依照任務內容的規格寫入資料
  const skillRepo = dataSource.getRepository("Skill");
  const userRepo = dataSource.getRepository("User");
  const courseRepo = dataSource.getRepository("Course");
  //   1. SKILL 三筆：重訓、瑜珈、飛輪
  // Create ---> save
  const skill1 = await skillRepo.save({ name: "重訓" });
  const skill2 = await skillRepo.save({ name: "瑜珈" });
  const skill3 = await skillRepo.save({ name: "飛輪" });

  //   2. USER 兩位教練，role 都為 'COACH'：
  //      海格教練（coach1@livefit.tw）、小美教練（coach2@livefit.tw）
  const user1 = await userRepo.save({
    name: "海格教練",
    email: "coach1@livefit.tw",
    role: "COACH",
  });
  const user2 = await userRepo.save({
    name: "小美教練",
    email: "coach2@livefit.tw",
    role: "COACH",
  });
  //   3. COURSE 四堂課：肌力入門班、週末飛輪、晨間瑜珈、核心特訓
  //      每堂課記得接上教練跟技能
  //      關聯的接法：user / skill 直接放前面存好的教練、技能物件
  //     （TypeORM 會自動取出它的 id 填進外鍵），寫法範例：
  //      courseRepo.save({ name: '...', user: 教練物件, skill: 技能物件 })
  // ======================================================================
  await courseRepo.save({
    name: "肌力入門班",
    description: "肌力入門班，適合初學者",
    start_at: new Date("2026-01-01 10:00:00"),
    end_at: new Date("2026-01-01 11:00:00"),
    max_participants: 10,
    user: user1,
    skill: skill1,
  });
  await courseRepo.save({
    name: "週末飛輪",
    description: "週末飛輪，挑戰自我",
    start_at: new Date("2026-01-02 10:00:00"),
    end_at: new Date("2026-01-02 11:00:00"),
    max_participants: 15,
    user: user2,
    skill: skill3,
  });
  await courseRepo.save({
    name: "晨間瑜珈",
    description: "晨間瑜珈，喚醒身心",
    start_at: new Date("2026-01-03 07:00:00"),
    end_at: new Date("2026-01-03 08:00:00"),
    max_participants: 18,
    user: user2,
    skill: skill2,
  });
  await courseRepo.save({
    name: "核心特訓",
    description: "核心特訓，強化核心肌群",
    start_at: new Date("2026-01-04 10:00:00"),
    end_at: new Date("2026-01-04 11:00:00"),
    max_participants: 12,
    user: user1,
    skill: skill1,
  });
  console.log("🌱 seed 完成");
  await dataSource.destroy();
}

main().catch((e) => {
  console.error("seed 失敗：", e.message);
  process.exit(1);
});
