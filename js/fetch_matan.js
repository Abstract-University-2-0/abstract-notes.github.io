const months = [
  "января", "февраля",
  "марта", "апреля",
  "мая", "июня",
  "июля", "августа",
  "сентября", "октября",
  "ноября", "декабря"
];

const ghUrlPrefix = "https://raw.githubusercontent.com/zimch/" +
  "abstracts/main/math_anal/approved_absctracts/";
const repoAddr = 'https://api.github.com/repos/zimch/abstracts' +
  '/contents/math_anal/approved_absctracts';
const linkList = document.getElementById('index_list');
const frame = document.getElementById("docframe");

function parse_date(date) {
  const [month, day] = date.split('_');
  try {
    if (+month > 12 || +month < 1) {
      throw "bad month";
    }
  }
  catch (e) {
    console.log("кажется произошла ошибка " + e);
    return {
      day, month: "wtf"
    };
  }
  return { day, month: months[month - 1] };
};

async function fetchNotes() {
  console.group('fetch notes');

  const data = await (await fetch(repoAddr)).json();

  const buttons = [];

  for (const file of data) {
    const { day, month } = parse_date(file.name);
    const button = linkList.appendChild(document.createElement('button'));
    button.id = `m${file.name}`;
    button.className = 'index_button';
    button.textContent = `${file.name.split("_")[1]}.${file.name.split("_")[0]}`//`${day} ${month}`;
    button.filename = file.name
    button.title = `лекция ${day} ${month}`
    button.onclick = (e) => {
      frame.src = `https://docs.google.com/viewer?url=${ghUrlPrefix}${e.target.id.substring(1)}/calculus.pdf&embedded=true`;
      console.log('pfd updated');
    };
    buttons.push(file.name);
  }
  console.groupEnd('fetch notes');
}

fetchNotes();
