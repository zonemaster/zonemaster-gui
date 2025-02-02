import { Machine } from '@bleckert/state';

const transitions = {
  IDLE: {
    on: {
      startTest: 'TESTING'
    }
  },
  TESTING: {
    on: {
      finishTest: 'IDLE'
    }
  }
};

const initialData = {};
const actions = {
  TESTING: (m) => {
    setTimeout(() => {
      m.dispatch('finishTest');
    }, 1000);
  }
};

export default new Machine(transitions, 'IDLE', initialData, actions);
