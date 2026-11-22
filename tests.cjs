const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

require("./event.config.js");
require("./state.js");
const event = globalThis.SANTA_EVENT;
const { createGame } = globalThis.SantaState;

function memoryStorage() {
  const entries = new Map();
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value)
  };
}

function complete(game) {
  game.move(1);
  game.move(2);
  event.missions.forEach((mission, index) => {
    assert.equal(game.answer(mission.answers[0]), true);
    assert.equal(game.count, index + 1);
    assert.equal(game.move(index + 3), true);
  });
}

test("3개 전시구역에 2개씩 배치하고 사진과 정답을 연결한다", () => {
  const zones = Object.groupBy(event.missions, (mission) => mission.zone);
  assert.equal(Object.keys(zones).length, 3);
  assert.ok(Object.values(zones).every((group) => group.length === 2));
  assert.equal(new Set(event.missions.map((mission) => mission.id)).size, 6);
  for (const mission of event.missions) {
    assert.ok(fs.statSync(path.join(__dirname, mission.image)).size > 0);
    assert.ok(mission.hint && mission.alt && mission.answers.length);
  }
  assert.ok(fs.statSync(path.join(__dirname, event.cover)).size > 0);
});

test("오답과 미션 건너뛰기를 거부하고 정답의 공백과 대소문자를 처리한다", () => {
  const game = createGame(event, memoryStorage());
  game.move(1);
  game.move(2);
  assert.equal(game.move(3), false);
  assert.equal(game.claim(), false);
  assert.equal(game.answer("오답"), false);
  assert.equal(game.answer("   "), false);
  assert.equal(game.count, 0);
  assert.equal(game.answer("  ＳＮＯＷ ｆｌａｋｅ "), true);
  assert.equal(game.answer("눈"), false);
  assert.equal(game.count, 1);
});

test("같은 저장소에서 새로 열린 앱이 현재 화면과 해결한 미션을 복원한다", () => {
  const storage = memoryStorage();
  const game = createGame(event, storage);
  game.move(1);
  assert.equal(createGame(event, storage).screen, 1);
  game.move(2);
  game.answer(event.missions[0].answers[0]);
  const restored = createGame(event, storage);
  assert.equal(restored.screen, 2);
  assert.equal(restored.count, 1);
  assert.equal(restored.move(3), true);
  assert.equal(createGame(event, storage).screen, 3);
});

test("여섯 미션을 끝낸 뒤에만 수령할 수 있고 재시작 후에도 수령 상태가 남는다", () => {
  const storage = memoryStorage();
  const game = createGame(event, storage);
  complete(game);
  const reopened = createGame(event, storage);
  assert.equal(reopened.screen, 8);
  assert.equal(reopened.claim(), true);
  assert.equal(createGame(event, storage).claim(), false);
  reopened.restart();
  const restarted = createGame(event, storage);
  assert.equal(restarted.screen, 0);
  assert.equal(restarted.count, 0);
  assert.equal(restarted.claimed, true);
  complete(restarted);
  assert.equal(restarted.claim(), false);
});

test("저장 실패를 성공으로 표시하지 않는다", () => {
  const game = createGame(event, {
    getItem: () => null,
    setItem: () => { throw new Error("storage disabled"); }
  });
  complete(game);
  assert.equal(game.claim(), false);
  assert.equal(game.claimed, false);
  assert.equal(game.available, false);
});