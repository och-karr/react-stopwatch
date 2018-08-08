class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
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
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            }),
            this.watch = setInterval(() => this.step(), 10); //tutaj coś z bind
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        var times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({
            times: {
                minutes: times.minutes,
                seconds: times.seconds,
                miliseconds: times.miliseconds
            }
        })
    }

    stop() {
        this.setState({
            running: false
        }),
        clearInterval(this.watch);
    }

    zero() {
        this.setState({
            running: false
        }),
        this.reset();
    }

    add() {
        if (this.state.running === false){
            var timeValue = this.state.times.innerText;
            newResults = results.push(timeValue);
            this.setState({
                results: newResults
            }) 
        } 
    }

    clean() {
        this.setState({
            results: []
        })
    }

    render() {
        return (
            <div>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>
                        Start
                    </a>
                    <a href={'#'} className={'button'} id={'stop'} onClick={() => this.stop()}>
                        Stop
                    </a>
                    <a href={'#'} className={'button'} id={'zero'} onClick={() => this.zero()}>
                        Zero
                    </a>
                    <a href={'#'} className={'button'} id={'add'} onClick={() => this.add()}>
                        Add
                    </a>
                    <a href={'#'} className={'button'} id={'clean'} onClick={() => this.clean()}>
                        Clean
                    </a>
                </nav>
                <div className={'stopwatch'}></div>
                <ul className={'results'} onClick={this.state.results.map(resultsValue){
                    this.format(this.state.times)
                }}></ul>
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
