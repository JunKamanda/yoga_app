const h1 = document.querySelector("h1");
const main = document.querySelector("main");
const btnContainer = document.querySelector(".btnContainer");

let exercicesArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];

const utils = {
  pageContent: function (title, content, btn) {
    h1.innerHTML = title;
    main.innerHTML = content;
    btnContainer.innerHTML = btn;
  },
};

const pages = {
  lobby: function () {
    let mapArray = exercicesArray.map((exo) => {
      return `
        <li>
          <div class="card-header">
          <input type="number" min="1" max="10" value="${exo.min}" id=${exo.pic}>
          <span>min</span>
          </div>
          <img src="../img/${exo.pic}.png" alt="exercice ${exo.pic}">
          <i class="fas fa-arrow-alt-circle-left arrow"></i>
          <i class="fas fa-times-circle deleteBtn"></i>
        </li>
      `;
    }).join("");

    utils.pageContent(
      `Paramétrage <i id="reboot" class="fas fa-undo"></i>`,
      `<ul>${mapArray}</ul>`,
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
