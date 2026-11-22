(() => {
  "use strict";

  const event = globalThis.SANTA_EVENT;
  const storage = {
    getItem: (key) => globalThis.localStorage.getItem(key),
    setItem: (key, value) => globalThis.localStorage.setItem(key, value)
  };
  const game = SantaState.createGame(event, storage);
  const app = document.querySelector("#app");
  const counter = document.querySelector("#counter");
  const status = document.querySelector("#storage-status");
  const total = event.missions.length;
  document.title = event.title;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(label, className, action) {
    const node = element("button", className, label);
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }

  function go(screen) {
    if (game.move(screen)) render(true);
  }

  function updateStatus() {
    status.textContent = game.available ? "" :
      "이 브라우저에서 진행 기록을 저장하거나 불러올 수 없습니다.";
  }

  function progress() {
    const card = element("aside", "progress-card");
    const heading = element("h2", "", "되찾은 생명 신호");
    const count = element("strong", "", game.count + " / " + total);
    const marks = element("div", "signals");
    marks.setAttribute("aria-hidden", "true");
    event.missions.forEach((_, index) => {
      marks.append(element("span", index < game.count ? "lit" : "", "✦"));
    });
    const meter = element("progress", "sr-only");
    meter.max = total;
    meter.value = game.count;
    meter.setAttribute("aria-label", "되찾은 생명 신호");
    card.append(heading, count, marks, meter);
    return card;
  }

  function photo(src, alt, className) {
    const img = element("img", className);
    img.src = src;
    img.alt = alt;
    return img;
  }

  function intro() {
    const card = element("section", "hero");
    const copy = element("div", "hero-copy");
    copy.append(
      element("p", "eyebrow", "크리스마스 특별 미션"),
      element("h1", "", event.title),
      element("p", "lead", event.intro),
      button("시작하기", "primary", () => go(1))
    );
    if (event.sampleNotice) copy.append(element("p", "small", event.sampleNotice));
    card.append(photo(event.cover, "", "hero-image"), copy);
    return card;
  }

  function story() {
    const card = element("section", "panel story");
    card.append(element("p", "eyebrow", "사건 개요"), element("h1", "", event.storyTitle));
    event.story.forEach((line) => card.append(element("p", "lead", line)));
    card.append(button("수사 시작", "primary", () => go(2)));
    return card;
  }

  function missionScreen(index) {
    const mission = event.missions[index];
    const solved = index < game.count;
    const layout = element("div", "mission-layout");
    const card = element("section", "panel mission");
    const hint = element("details", "hint");
    hint.append(element("summary", "", "힌트 보기"), element("p", "", mission.hint));
    card.append(
      element("p", "eyebrow", mission.zone),
      element("h1", "", mission.title),
      photo(mission.image, mission.alt, "clue-photo"),
      element("p", "prompt", mission.prompt),
      hint
    );

    if (solved) {
      const result = element("div", "success");
      result.append(element("strong", "", "생명 신호를 되찾았어요!"), element("p", "", mission.note));
      card.append(result, button(index === total - 1 ? "수사 결과 보기" : "다음 미션", "primary", () => go(index + 3)));
    } else {
      const form = element("form", "answer-form");
      const label = element("label", "", "전시물 이름");
      label.htmlFor = "answer";
      const field = element("input", "");
      field.id = "answer";
      field.type = "text";
      field.required = true;
      field.autocomplete = "off";
      field.maxLength = 100;
      field.placeholder = "찾은 전시물의 이름을 쓰세요";
      field.setAttribute("aria-describedby", "feedback");
      const submit = element("button", "primary", "정답 확인");
      submit.type = "submit";
      const row = element("div", "answer-row");
      row.append(field, submit);
      const feedback = element("p", "feedback");
      feedback.id = "feedback";
      feedback.setAttribute("aria-live", "polite");
      form.append(label, row, feedback);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (game.answer(field.value)) {
          render();
          app.querySelector(".success strong")?.focus();
          return;
        }
        field.setAttribute("aria-invalid", "true");
        feedback.textContent = "아직 신호가 잡히지 않았어요. 사진과 힌트를 다시 살펴보세요.";
      });
      card.append(form);
    }

    const sidebar = element("div", "mission-sidebar");
    sidebar.append(progress(), button("이전 화면", "quiet", () => go(index + 1)));
    layout.append(sidebar, card);
    return layout;
  }

  function finish() {
    const card = element("section", "panel finish");
    card.append(
      element("div", "finish-icon", "✦"),
      element("p", "eyebrow", "수사 완료"),
      element("h1", "", "크리스마스의 불빛이 돌아왔어요!"),
      progress()
    );
    if (!game.claimed) {
      card.append(
        element("p", "lead", "이 화면을 행사 직원에게 보여 주세요. 직원은 기념품을 전달할 때 아래 버튼을 눌러 주세요."),
        button("직원확인", "primary", () => {
          if (game.claim()) render(true);
          else updateStatus();
        })
      );
    }
    card.append(button("처음부터 다시 수사하기", "quiet restart", () => {
      game.restart();
      render(true);
    }));
    return card;
  }

  function render(focus = false) {
    const screen = game.screen;
    counter.textContent = screen >= 2 && screen < total + 2
      ? "미션 " + (screen - 1) + " / " + total : "";
    app.replaceChildren();
    if (game.claimed) {
      const receipt = element("div", "receipt", "✓  기념품 수령 완료");
      receipt.setAttribute("role", "status");
      app.append(receipt);
    }
    app.append(screen === 0 ? intro() : screen === 1 ? story() :
      screen === total + 2 ? finish() : missionScreen(screen - 2));
    const success = app.querySelector(".success strong");
    if (success) success.tabIndex = -1;
    updateStatus();
    if (focus) {
      const heading = app.querySelector("h1");
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("storage", (e) => {
    if (e.key === game.giftKey && !game.claimed) {
      game.restore();
      render();
    }
  });
  render();
})();