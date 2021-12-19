import LoginModal from './components/LoginModal/LoginModal';

class App {
  constructor(target) {
    this.target = target;
    new LoginModal({ $app: target });
  }
}

export default App;
