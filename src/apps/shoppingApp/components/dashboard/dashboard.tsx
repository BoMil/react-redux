import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
	// Store state getters
	const username: string | null = useSelector((state: RootState) => state?.auth?.username);

	return (
		<>
			<div className="flex items-center justify-center pt-5">
				<span className=" font-bold">
					Welcome to dashboard page <span className="capitalize italic font-medium">{username} !</span>
				</span>
			</div>
		</>
	);
};

export default Dashboard;
