const h1 = document.querySelector("h1");
const main = document.querySelector("main");
const btnContainer = document.querySelector(".btnContainer");

let arrayBasic = [
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
]
let exercicesArray = [];

(()=>{
  if (localStorage.yogastock) {
    exercicesArray = JSON.parse(localStorage.yogastock);
    console.log("Ensuite là");
  }else{
    exercicesArray = arrayBasic;
    console.log("Ici d'abord");
  }
})()

class Exercice {
  constructor(){
    this.index = 0;
    this.minutes = exercicesArray[this.index].min;
    this.seconds = 0;
  }
  updateCounter(){

    this.seconds = this.seconds < 10 ? "0"+this.seconds : this.seconds = this.seconds;

    setTimeout(()=>{
      if (this.minutes == 0 && this.seconds == "00") {
        this.index ++
        this.ring();
        if (this.index < exercicesArray.length) {
          this.minutes = exercicesArray[this.index].min;
          this.seconds = 0;
          this.updateCounter();
        }else{
          pages.finish();
        }
        
      }else if (this.seconds == "00"){
        this.minutes --;
        this.seconds = 59;
        this.updateCounter();
      }else{
        this.seconds --;
        this.updateCounter();
      }
    }, 100)

    return main.innerHTML= `
      <div class="exercice-container">
        <p>${this.minutes} : ${this.seconds}</p>
        <img src="../img/${exercicesArray[this.index].pic}.png" >
        <div>${this.index + 1} / ${exercicesArray.length}</div>
      </div>
    `
  }
  ring(){
    const audio = new Audio();
    audio.src="../ring.mp3";
    audio.play();
  }
}

const utils = {
  pageContent: function (title, content, btn) {
    h1.innerHTML = title;
    main.innerHTML = content;
    btnContainer.innerHTML = btn;
  },
  handleMinutes: function(){
    document.querySelectorAll("input[type='number']").forEach((input)=>{
      input.addEventListener("input", (e)=>{
        exercicesArray.map((exo)=>{
          if(exo.pic == e.target.id){
            exo.min = parseInt(e.target.value);
            this.store();
          }
        })
      })
    })
  },
  handleArrows: function(){
    document.querySelectorAll(".arrow").forEach((arrow)=>{
      arrow.addEventListener("click", (e)=>{
        let position = 0;
        exercicesArray.map((exo)=>{
          console.log(`${position} avant la condition`);
          
          if (exo.pic == e.target.dataset.pic && position != 0) {
            [exercicesArray[position],exercicesArray[position - 1]] = [exercicesArray[position - 1], exercicesArray[position]];
            pages.lobby();
            this.store();
            console.log(`J'ai cliqué l'image ${e.target.dataset.pic} et sa position est ${position} dans la condition si`);
          }else{
            position++;
            console.log(`${position} dans la condition sinon`);
          }
        })
        console.log(`${position} après la condition`);        
      })
    })
  },
  handleDelete: function(){
    document.querySelectorAll(".deleteBtn").forEach((btn)=>{
      btn.addEventListener("click", (e)=>{
        let newArray = [];
        exercicesArray.map((exo)=>{
          if (exo.pic != e.target.dataset.pic) {
            newArray.push(exo);
            pages.lobby();
            this.store();
          }
          exercicesArray = newArray;
        })
      })
    })
  },
  reboot: function(){
    exercicesArray =  arrayBasic;
    pages.lobby();
    this.store();
  },
  store: function(){
    localStorage.yogastock = JSON.stringify(exercicesArray)
  }

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
          <i class="fas fa-arrow-alt-circle-left arrow" data-pic="${exo.pic}"></i>
          <i class="fas fa-times-circle deleteBtn" data-pic="${exo.pic}"></i>
        </li>
      `;
    }).join("");

    utils.pageContent(
      `Paramétrage <i id="reboot" class="fas fa-undo"></i>`,
      `<ul>${mapArray}</ul>`,
      `<button id="start">Démarrer<i class="fa fa-play"></i></button>`
    );
    utils.handleMinutes();
    utils.handleArrows();
    utils.handleDelete();
    reboot.addEventListener("click", ()=>utils.reboot());
    start.addEventListener("click", ()=> this.routine());
  },
  routine: function () {
    const exercice = new Exercice();
    utils.pageContent(`Routine`, exercice.updateCounter(), null);
  },
  finish: function () {
    utils.pageContent(
      `C'est terminé`,
      `<button id="start">Recommencer<i class="fa fa-circle-o-notch"></i></button>`,
      `<button id="reboot" class="btn-reboot">Reinitialiser<i class="fa fa-cog"></i></button>`
    );
    start.addEventListener("click", ()=>this.routine());
    reboot.addEventListener("click", ()=>utils.reboot())
  },
};

pages.lobby();
