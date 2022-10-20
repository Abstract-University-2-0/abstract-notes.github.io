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

(async () => {
    const response = await fetch(
      'https://api.github.com/repos/zimch/abstracts' +
      '/contents/math_anal/approved_absctracts'
    );
    const data = await response.json();
    let htmlString = '<ul class="index_list">';

    for (let file of data) {
      let day = parse_date(file.name)[0];
      let month = parse_date(file.name)[1];
      htmlString += `<li><a 
          href="${file.path}/calculus.pdf" 
          target="_blank"
          class="index_link"
        > 
        лекция ${day} ${month}
        </a></li>`;
    }

    htmlString += '</ul>';
    document.getElementsByTagName('body')[0].innerHTML += htmlString;
  })()
