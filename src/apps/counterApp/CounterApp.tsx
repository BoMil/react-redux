import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./counter.scss";
import { actions } from "../../store";

interface CounterAppProps {
	initialCount: number;
}

const CounterApp = ({ initialCount }: CounterAppProps) => {
	const counter: number = useSelector((state: any) => state?.counter ?? 0);
	const dispatche = useDispatch();

	// This will be called once when the component is mounted
	useEffect(() => {
		setCounterValue();
	}, [initialCount]);

	const increment = () => {
		dispatche(actions.increment());
		// dispatche({ type: "INCREMENT" }); !OLD WAY
	};

	const decrement = () => {
		dispatche(actions.decrement());
		// dispatche({ type: "DECREMENT" }); !OLD WAY
	};

	const setCounterValue = () => {
		dispatche(actions.setValue(initialCount));
		// dispatche({ type: "SET_VALUE", value: initialCount });!OLD WAY
	};

	return (
		<>
			<h1>Counter App</h1>
			<p>Count: {counter}</p>
			<button className="counter-btn" onClick={increment}>
				Increment
			</button>
			<button className="counter-btn" onClick={decrement}>
				Decrement
			</button>
		</>
	);
};

export default CounterApp;
