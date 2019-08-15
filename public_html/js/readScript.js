
readFromFile('WebsiteText.txt');
function readFromFile(path){
  $.get(path, function(data) {
     processData(data);
  }, 'text');
}

function processData(data){
  console.log(data);
const d = document.getElementById("myDiv")
  d.innerHTML = data;
}
