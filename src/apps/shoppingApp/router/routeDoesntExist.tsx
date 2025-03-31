interface RouteDoesntExistProps {}

const RouteDoesntExist = (props: RouteDoesntExistProps) => {
	const goBack = () => {
		window.history.back();
	};

	return (
		<>
			<div className="">
				<h1 className="">404</h1>
				<h3 className="">Oops! The page you're looking for doesn't exist.</h3>

				<p className="">Sorry, the page you're looking for doesn't exist. If you think this is a mistake, please contact us.</p>

				<button className="">Contact Us</button>

				<p className="">Or you can go back to the previous page.</p>

				<button className="" onClick={goBack}>
					Go Back
				</button>
			</div>
		</>
	);
};

export default RouteDoesntExist;
