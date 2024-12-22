import { Component } from "preact";
import "./status.less";

interface ComponentProps {}

interface ComponentState {
  time: number;
}

class Status extends Component<ComponentProps, ComponentState> {
  constructor() {
    super();
    this.state = { time: Date.now() };
  }

  // // Lifecycle: Called whenever our component is created
  // componentDidMount() {
  //   // update time every second
  //   this.timer = setInterval(() => {
  //     this.setState({ time: Date.now() });
  //   }, 1000);
  // }

  // // Lifecycle: Called just before our component will be destroyed
  // componentWillUnmount() {
  //   // stop when not renderable
  //   clearInterval(this.timer);
  // }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return <span class="status">{time}</span>;
  }
}

export default Status;
