function App() {

  const [minutes, setMinutes] = React.useState(25)
  const [breakMinutes, setBreakMinutes] = React.useState(5)
  const [rminutes, setRminutes] = React.useState(breakMinutes)
  const [rseconds, setRseconds] = React.useState(0)
  const [sminutes, setSminutes] = React.useState(minutes)
  const [sseconds, setSseconds] = React.useState(0)
  const [resting, setResting] = React.useState(false)
  const [pause, setPause] = React.useState(false)
  let alarm = document.getElementById("beep")

  React.useEffect(() => {
    let interval = setInterval(() => {

      clearInterval(interval)
      if(pause) {
  
        start_counter()

      }
      
    }, 1001)

  }, [sseconds, rseconds, resting])

  const start_counter = () => {
    if(!resting) {
      if (sseconds === 0) {
        if (sminutes === 0) {
          alarm.play()
          setSminutes(minutes)
          setSseconds(0)
          setResting(!resting)
        } else {
          setSseconds(59)
          setSminutes((current) => current - 1)
          return sseconds
        }
      } else {
          setSseconds((current) => current - 1)
      }

    } else {
      if (rseconds === 0) {
        if (rminutes === 0) {
          alarm.play()
          setRminutes(breakMinutes)
          setRseconds(0)
          setResting(!resting)
        } else {
          setRseconds(59)
          setRminutes((current) => current - 1)
        }
      } else {
          setRseconds((current) => current - 1)
      }
    }
  }

  const startTimer = () => {
    if (!pause) {
      setSseconds((current) => {
        if(current<=0){
          setSminutes((current) => current - 1)
          return 59
        } else { console.log(current-1)
          return current - 1 }
        
      })
    }
    setPause(!pause)

  }

  const incrementTime = (type) => {
    if (type === "break") {
      if (rminutes >= 59) {
        setRminutes(60)
        setBreakMinutes(60)
      } else {
        setRminutes((current) => {
          setBreakMinutes(current+1)
          return current + 1})
      }
    } else if (type === "session") {
      if (sminutes >= 59) {
        setSminutes(60)
      } else {
        setSminutes((current) => {
          setMinutes(current+1)
          return current + 1})
      }
    }
  }

  const decrementTime = (type) => {
    if (type === "break") {
      if (rminutes <= 1) {
        setRminutes(1)
        setBreakMinutes(1)
      } else {
        setRminutes((current) => {
          setBreakMinutes(current - 1)
          return current - 1})
      }
    } else if (type === "session") {
      if (sminutes <= 1) {
        setSminutes(1)
        setMinutes(1)
      } else {
        setSminutes((current) => {
        setMinutes(current-1)
        return current - 1})
      }
    }
  }

  const presentTime = (number) => {
    if (number < 0) {
      return `0${0}`
    }
    return number < 10 ? `0${number}` : number
  }

  const reset = () => {
    setRseconds(0)
    setRminutes(5)
    setBreakMinutes(5)
    setSminutes(25)
    setSseconds(0)
    setMinutes(25)
    setSseconds(0)
    alarm.currentTime = 0
    setPause(false)
    setResting(false)
  }

  return <div className="pomodoro">
    <div className="card-container">
        <div className="full">
        <h3 id="break-label">Break Length</h3>
        <div className="break controls">
        <button id="break-increment" className="btn btn-primary" type="button" onClick={() => incrementTime("break")}>
          Up
        </button>
        <div id="break-length">
        {breakMinutes}
        </div>
        <button id="break-decrement" className="btn btn-primary" type="button" onClick={() => decrementTime("break")}>
          Down
        </button>
      </div>
      </div>

        <div className="full">
        <h3 id="session-label">How long can you go?</h3>
        <div className="sesssion controls">
        <button id="session-increment" className="btn btn-primary" type="button" onClick={() => incrementTime("session")}>
          Up
        </button>
        <div id="session-length">
        {minutes}
        </div>
        <button id="session-decrement" className="btn btn-primary" type="button" onClick={() => decrementTime("session")}>
          Down
        </button>
      </div>
      </div>
    </div>

    <div className="clock">
      <div className="full">
      <h1 className="timer-label">{!resting ? "Let's GOOOO!!!" : "Time to rest up..."}</h1>


    <div className="controls">
    <button id="start_stop" className="btn btn-primary" type="button" onClick={() => startTimer()}>
          {!pause ? "Play" : "Pause"}
    </button>

    <button id="reset" className="btn btn-primary" type="button" onClick={() => reset()}>
          Reset
    </button>
    </div>

    <div id="time-left" className="timer">
      {resting ? presentTime(rminutes) : presentTime(sminutes)}:{resting ? presentTime(rseconds) : presentTime(sseconds)}
    </div>
    </div>
    </div>

    <audio id="beep" preload="auto" src="https://assets.mixkit.co/sfx/preview/mixkit-facility-alarm-908.mp3"></audio>
    
          </div>

}

ReactDOM.render(<App />, document.getElementById("app"))