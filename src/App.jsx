import { useDispatch, useSelector } from 'react-redux';
import { decrement, fetchCounterRequest, increment } from './store/slice';
import { selectCounterValue, selectLoading } from './store/selectors';

function App() {
  const loading = useSelector(selectLoading)
  const value = useSelector(selectCounterValue)
  const dispatch = useDispatch();

  return (
    <div style={{paddingInline: '20px'}}>
      <h1>Counter: {loading ? 'Loading...' : value}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(fetchCounterRequest())}>Fetch from API</button>
    </div>
  );
}

export default App;
