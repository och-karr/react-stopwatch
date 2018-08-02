class Stopwatch extends React.Component {

    // static defaultProps = {
    //     running: false,
    //     display: display,
    //     times: times
    //   }
    //   static propTypes = {
    //     running: React.PropTypes.number.isRequired,
    //     display: React.PropTypes.object.isRequired,
    //     times: React.PropTypes.number.isRequired
    //   }

    constructor(props) {
        super(props);
        this.state = {
            running: false,
            display: display,
            reset()
        }
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    zero() {
        this.running = false;
        this.reset();
        this.print();
    }

    add() {
        if (this.running === false){
            var innerDisplay = this.display.innerText;
            // console.log(innerDisplay); 
            var results = $('.results');   
            $('<li>').addClass('list-element').text(innerDisplay).appendTo(results);
        } 
    }

    clean() {
        var listElement = $('.list-element');
        listElement.remove();
    }

    render: function(times){
        return
        this.display.innerText = this.format(this.props.times);
    }
}

var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let zeroButton = document.getElementById('zero');
zeroButton.addEventListener('click', () => stopwatch.zero());

let addButton = document.getElementById('add');
addButton.addEventListener('click', () => stopwatch.add());

let cleanButton = document.getElementById('clean');
cleanButton.addEventListener('click', () => stopwatch.clean());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
