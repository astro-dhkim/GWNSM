(() => {
  "use strict";

  const normalize = (value) => String(value ?? "").normalize("NFKC")
    .toLowerCase().replace(/\s+/gu, "");

  function createGame(event, storage) {
    const total = event.missions.length;
    const prefix = "santa-case:" + event.eventId;
    const runKey = prefix + ":run:v1";
    const giftKey = prefix + ":gift:v1";
    let available = true;
    let claimed = false;
    let run = { screen: 0, solved: [] };

    function restore() {
      try {
        claimed = claimed || storage.getItem(giftKey) === "received";
        const saved = JSON.parse(storage.getItem(runKey) ?? "null");
        if (!saved || !Array.isArray(saved.solved)) return;
        let count = 0;
        while (count < total && saved.solved.includes(event.missions[count].id)) count++;
        const screen = Number.isInteger(saved.screen) ? saved.screen : 0;
        run = {
          screen: Math.max(0, Math.min(screen, count + 2, total + 2)),
          solved: event.missions.slice(0, count).map((mission) => mission.id)
        };
      } catch {
        available = false;
      }
    }

    function saveRun() {
      try {
        storage.setItem(runKey, JSON.stringify(run));
      } catch {
        available = false;
      }
    }

    restore();

    return {
      runKey, giftKey, restore,
      get screen() { return run.screen; },
      get count() { return run.solved.length; },
      get claimed() { return claimed; },
      get available() { return available; },
      move(screen) {
        if (!Number.isInteger(screen) || screen < 0 ||
            screen > Math.min(run.solved.length + 2, total + 2)) return false;
        run.screen = screen;
        saveRun();
        return true;
      },
      answer(value) {
        const index = run.screen - 2;
        if (index < 0 || index >= total || index !== run.solved.length) return false;
        const guess = normalize(value);
        const mission = event.missions[index];
        if (!guess || !mission.answers.some((answer) => normalize(answer) === guess)) return false;
        run.solved.push(mission.id);
        saveRun();
        return true;
      },
      claim() {
        if (run.screen !== total + 2 || run.solved.length !== total || claimed) return false;
        try {
          storage.setItem(giftKey, "received");
          claimed = storage.getItem(giftKey) === "received";
          available = claimed;
        } catch {
          available = false;
        }
        return claimed;
      },
      restart() {
        run = { screen: 0, solved: [] };
        saveRun();
      }
    };
  }

  globalThis.SantaState = { createGame };
})();