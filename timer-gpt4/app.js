const container = d3.select("#timer-container");
const width = container.node().getBoundingClientRect().width;
const height = container.node().getBoundingClientRect().height;
const radius = Math.min(width, height) / 2;

const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const pie = d3.pie()
    .sort(null)
    .value(d => d.value);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

function createTimer(minutes) {
    const data = Array.from({length: minutes}, (_, i) => ({value: 1, index: i}));
    const timerInterval = setInterval(() => {
        updateTimer(data);
        if (data.length === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function updateTimer(data) {
    data.pop();

    const path = svg.selectAll("path")
        .data(pie(data), d => d.data.index);

    path.enter().append("path")
        .attr("fill", (_, i) => d3.interpolateRainbow(i / data.length))
        .attr("d", arc);

    path.exit().remove();
}

createTimer(30);
