const lifeTopic = document.querySelectorAll('.life-topic');
const promptBox = document.getElementById('prompt');
// console.log("Life topic: ", lifeTopic);

const mark = document.querySelectorAll('.mark');
const finalResult = document.getElementById('final-result');
const buttonBox = document.getElementById('button-box');
const skip = document.getElementById('skip');
const reload = document.getElementById('reload');
const download = document.getElementById('download');
const myChart = document.getElementById('myChart');
const date = document.getElementById('date');
const wheelOfLife = document.getElementById('wheel-of-life');







let currentTopic = 0;
let currentSubTopic = 0;
let totalValue = 0;
let labels = [];
let data = [];
let bgColors = [];
let colorArray = ['rgba(255, 99, 110, 0.65)', 'rgba(54, 162, 235, 0.65)', 
                  'rgba(255, 206, 86, 0.65)', ' rgba(0, 170, 23, 0.65)', 
                  'rgba(153, 102, 255, 0.65)',
                  'rgba(255, 128, 0, 0.65)', 'rgba(0, 51, 85, 0.65)', 
                  'rgba(85, 0, 0, 0.65)', 'rgba(85, 0, 52, 0.65)', 

    '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


const now = new Date();
const dateTime = now.getDay() + " - " + now.getMonth()+ " - " + now.getFullYear();
date.textContent = dateTime.toString();




lifeTopic.forEach(lt => lt.style.display = "none");
lifeTopic[currentTopic].style.display = "block";
var lifeSubTopic=lifeTopic[currentTopic].getElementsByClassName("life-sub-topic");
lifeSubTopic[currentSubTopic].style.display = "block";
//targetDiv.textContent = "Goodbye world!";

//alert(lifeTopic[currentTopic].childNodes.length);
//lifeTopic[currentTopic].children[1].
//var lifeSubTopics = document.querySelectorAll('#xyz div')

//lifeTopic[currentTopic].childNodes.forEach(li => li.style.display = "none")
//lifeTopic[currentTopic].childNodes[currentSubTopic].style.display = "block";



skip.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentTopic >= lifeTopic.length - 1) {
        displayFinal();
        return;
    }
    lifeTopic[currentTopic].style.display = "none";
    currentTopic++;
    lifeTopic[currentTopic].style.display = "block";
});


mark.forEach(m => {
    m.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("you clicked on mark", m.childNodes[0].textContent);
        const markValue = m.childNodes[0].textContent;
		totalValue=totalValue+parseInt(markValue);
		if (currentSubTopic>=lifeSubTopic.length-1){
			console.log("markValue="+markValue+" totalValue="+totalValue+" lenght="+lifeSubTopic.length);
	        lifeTopic[currentTopic].style.display = "none";
	        if (currentTopic >= lifeTopic.length - 1) {
	            addDataToGraph(currentTopic, totalValue/lifeSubTopic.length);
	            displayFinal();
	            return;
	        }
	        addDataToGraph(currentTopic, totalValue/lifeSubTopic.length);
	        drawGraph();
	        currentTopic++;
			currentSubTopic=totalValue=0;
	        lifeTopic[currentTopic].style.display = "block";
			lifeSubTopic=lifeTopic[currentTopic].getElementsByClassName("life-sub-topic")
			lifeSubTopic[currentSubTopic].style.display = "block";
		}else{
			
			lifeSubTopic[currentSubTopic].style.display = "none";
			currentSubTopic++;
			lifeSubTopic[currentSubTopic].style.display = "block";
		}
    });
});


function addDataToGraph(currentTopic, markValue) {
    labels.push(lifeTopic[currentTopic].textContent.substring(0, lifeTopic[currentTopic].textContent.indexOf('?')));

    data.push(markValue);
    bgColors.push(colorArray[currentTopic]);
}



function displayFinal() {
    promptBox.style.display = "none";
    buttonBox.style.display = "block";
    finalResult.style.display = "block";
    console.log("There are no question left");
    console.log("All data at the end: ", { labels, data, bgColors });
    download.addEventListener('click', e => convertHtmlToPdf());
    drawGraph();
}


reload.addEventListener('click', e=>{
    location.reload();
})












function drawGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels,
            datasets: [{
                label: '# of Votes',
                data,
                backgroundColor: /*[
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'],*/
      bgColors,
                borderColor: bgColors,
                borderWidth: 1
            }]
        },
        options: {
            legend:{
                display: true,
                position: "right",
                align: 'center'
            },
            scales: {
                pointLabels: {
                    fontSize: 18
                }
            },
            responsive: true
        }
    });
}




function convertHtmlToPdf(){
    const screenshot =async () =>{
        const doc = new jsPDF('p', 'pt', "letter");
        const canvas = await html2canvas(myChart);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, "PNG", 75, 140);
        doc.fromHTML(wheelOfLife, 200, 25)
        doc.save("life-of-wheel.pdf");
    }
    screenshot();
}
