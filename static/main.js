var graphData = {
    type: 'line',
    data: {
        labels: [0,0,0,0,0,0],
        datasets: [{
            label: ' ',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor:
                'transparent',
            borderColor: [
                'rgba(255, 99, 132, 1)',

            ],

            borderWidth: 4
        },
        {
            label: ' ',
            data: [0,0,0,0,0,0],
            backgroundColor: [
                'transparent',

            ],
            borderColor: [
                'rgba(54, 162, 235, 0.8)',

            ],
            borderWidth: 4
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }
        }
    }
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx,graphData);



var socket = new WebSocket('ws://localhost:8000/ws/stock/');

socket.onmessage = function(e){

// First line graph data

    var djangoData = JSON.parse(e.data);
    console.log(djangoData[0].current_price);
    console.log(djangoData[0].time_now);
    console.log(djangoData[0].name);
// pushing y labels
    var newdata = graphData.data.datasets[0].data;
    newdata.shift();
    newdata.push(djangoData[0].current_price);
    graphData.data.datasets[0].data = newdata;
    myChart.update();
// pushing x labels
    var newlabel = graphData.data.labels;
    newlabel.shift();
    newlabel.push(djangoData[0].time_now);
    graphData.data.labels = newlabel;
    myChart.update();


    var coin_name = djangoData[0].name;

    graphData.data.datasets[0].label = coin_name


//    second line graph data

    var djangoData = JSON.parse(e.data);
    console.log(djangoData[1].current_price);
    console.log(djangoData[1].time_now)
    console.log(djangoData[1].name);

    var newdata = graphData.data.datasets[1].data;
    newdata.shift();
    newdata.push(djangoData[1].current_price);
    graphData.data.datasets[1].data = newdata;
    myChart.update();

//    var newlabel = graphData.data.labels;
//    newlabel.shift();
//    newlabel.push(djangoData[1].last_updated);
//    graphData.data.labels = newlabel;
//    myChart.update();

    var coin_name = djangoData[1].name;

    graphData.data.datasets[1].label = coin_name

    document.getElementById("price1").innerHTML = '$' + djangoData[0].current_price;
    document.getElementById("price2").innerHTML = '$' + djangoData[1].current_price;
    var image1 = document.getElementById("image1");
    image1.src = djangoData[0].image;
    var image2 = document.getElementById("image2");
    image2.src = djangoData[1].image;

    document.getElementById("date").innerHTML = Date();

    }