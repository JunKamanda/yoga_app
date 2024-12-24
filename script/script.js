const h1 = document.querySelector("h1");
const main = document.querySelector("main");
const btnContainer = document.querySelector(".btnContainer");

const utils = {
  pageContent: function (title, content, btn) {
    h1.innerHTML = title;
    main.innerHTML = content;
    btnContainer.innerHTML = btn;
  },
};

const pages = {
  lobby: function () {
    utils.pageContent(
      `Paramétrage <i id="reboot" class="fa fa-cog"></i>`,
      `Exercice`,
      `<button id="start">Démarrer<i class="fa fa-play"></i></button>`
    );
  },
  routine: function () {
    utils.pageContent(`Routine`, `Exercice avec chrono`, null);
  },
  finish: function () {
    utils.pageContent(
      `C'est terminé`,
      `<button id="start">Recommencer<i class="fa fa-circle-o-notch"></i></button>`,
      `<button id="reboot" class="btn-reboot">Reinitialiser<i class="fa fa-cog"></i></button>`
    );
  },
};

pages.lobby();
