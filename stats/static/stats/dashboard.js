console.log("hello world");

const dashboardSlug = document.getElementById('dashboard-slug').textContent.trim();
console.log(dashboardSlug);  
const user= document.getElementById('user').textContent.trim()

const submitBtn= document.getElementById('submit-btn')
const dataInput = document.getElementById('data-input')
const dataBox=document.getElementById('data-box')


const websocketUrl = `ws://${window.location.host}/ws/${dashboardSlug}/`;
console.log(websocketUrl); 

const socket = new WebSocket(websocketUrl);  
console.log(socket);  

socket.onmessage = function(e) {
    // console.log('Server: ' + e.data);
    const data = JSON.parse(e.data);  
    const { sender, message } = data;

    dataBox.innerHTML +=` <p> ${sender} : ${message} </p>`
    console.log(sender);
    console.log(message);

    
};


submitBtn.addEventListener('click', ()=>{
    const dataValue=dataInput.value
    socket.send(JSON.stringify({
        'message': dataValue,
        'sender': user
    }));

})


const ctx = document.getElementById('myChart').getContext("2d");
let chart;

const fetchChartData = async() =>{
    const currentUrl = window.location.href.replace(/\/$/, ''); // Remove trailing slash if present
    const chartUrl = `${currentUrl}/chart`; // Append 'chart' to the current URL
    
    // Fetch data from the chart endpoint
    const response = await fetch(chartUrl);    const data = await response.json()
    console.log(data)
    return data
}

// socket.onopen = function(e) {

// };


const drawChart = async()=>{
    const data = await fetchChartData()
    const {chartData, chartLabels}= data
    chart = new Chart(ctx ,{
        type:'pie',
        data:{
            labels:chartLabels,
            datasets:[{
                label:'% of contribution',
                data:chartData,
                borderWidth:1
            }]
        },
        options: {
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }
    })

}

const updateChart = async()=>{
    if (chart){
        chart.destroy()
    }
    await drawChart()

}

drawChart()
