class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    format() {
        return `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`;
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
    }

    add() {
        if (this.running === false){
            var innerDisplay = this.display.innerText;   
            $('<li>').addClass('list-element').text(innerDisplay).appendTo(results);
        } 
    }

    clean() {
        var listElement = $('.list-element');
        listElement.remove();
    }

    render() {
        return (
            <div>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} id={'start'} onClick={this.start}>
                        Start
                    </a>
                    <a href={'#'} className={'button'} id={'stop'} onClick={this.stop}>
                        Stop
                    </a>
                    <a href={'#'} className={'button'} id={'zero'} onClick={this.zero}>
                        Zero
                    </a>
                    <a href={'#'} className={'button'} id={'add'} onClick={this.add}>
                        Add
                    </a>
                    <a href={'#'} className={'button'} id={'clean'} onClick={this.clean}>
                        Clean
                    </a>
                </nav>
                <div className={'stopwatch'}></div>
                <ul className={'results'}></ul>
            </div>
        );
    }
}

var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementsByClassName('container')[0]);

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
