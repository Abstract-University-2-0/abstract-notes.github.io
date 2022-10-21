let months = [
  "января", "февраля",
  "марта", "апреля",
  "мая", "июня",
  "июля", "августа",
  "сентября", "октября",
  "ноября", "декабря"
];

function parse_date(date) {
  let day = date.split("_")[1]
  let month = date.split("_")[0]

  try{
    Number(month)
    if (Number(month) > 12 || Number(month) < 1) {
      throw "month > 12"
    }
  }
  catch (e) {
    console.log("кажется произошла ошибка " + e)
    return [day, "wtf"]
  }

  return [day, months[Number(month) - 1]]
};

async function fetchNotes() {
  console.log('fetch started')
  let ghUrlPrefix = "https://raw.githubusercontent.com/zimch/" + 
    "abstracts/main/math_anal/approved_absctracts/"
  let googleDocView = 'https://docs.google.com/viewer?url='
  let repoAddr = 'https://api.github.com/repos/zimch/abstracts' +
    '/contents/math_anal/approved_absctracts'
  const response = await fetch(repoAddr);
  const data = await response.json();

  let buttons = [] 

  for (let file of data) {
    let day = parse_date(file.name)[0];
    let month = parse_date(file.name)[1];

    let newHtmlStr = "";
    newHtmlStr += `<button id="m${file.name}" class="index_button"> лекция ${day} ${month} </button>`
    document.getElementsByTagName('ul')[0].innerHTML += newHtmlStr

    buttons.push(file.name)
  }
  // adding scripts to buttons
  for (const button of buttons) {
    document.getElementById("m" + button).onclick = () => {
      let newHtml = `<iframe 
      src="https://docs.google.com/viewer?url=${ghUrlPrefix}${button}/calculus.pdf&embedded=true"
       frameborder="0" style="width: 100%; height: 100%;"></iframe>`
      document.getElementsByClassName("index_pdf")[0].innerHTML = newHtml
      console.log('pfd updated')
    }
  }
}

// function listAdd() {
  
// }
fetchNotes()
