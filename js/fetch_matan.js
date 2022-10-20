let months = [
    "января", "февраля",
    "марта", "апреля",
    "мая", "июня",
    "июля", "августа",
    "сентярбя", "октября",
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

    return [day, months[Number(month)]]
};

async function fetchNotes() {
    console.log('fetch started')
    let googleDocView = 'https://docs.google.com/viewer?url='
    let repoAddr = 'https://api.github.com/repos/zimch/abstracts' +
      '/contents/math_anal/approved_absctracts'
    const response = await fetch(
      repoAddr
    );
    const data = await response.json();
    let htmlString = '<ul class="index_list"> </ul>';

    document.getElementsByTagName('body')[0].innerHTML += htmlString;

    for (let file of data) {
      let day = parse_date(file.name)[0];
      let month = parse_date(file.name)[1];

      const newResponse = await fetch(
        `${repoAddr}/${file.name}/calculus.pdf`
      );
      const newData = await newResponse.json();
      console.log(newData);
      let newHtmlStr = "";

      newHtmlStr += `<li><a 
          href="${googleDocView}${newData.download_url}"
          target="_blank"
          class="index_link"
        > 
        лекция ${day} ${month}
        </a></li>`;
        document.getElementsByTagName('ul')[0].innerHTML += newHtmlStr
    }
  }

fetchNotes()
