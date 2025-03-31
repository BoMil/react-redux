import { Link } from "react-router-dom";

interface HeaderLinkProps {
	text: string;
	to: string;
}
const HeaderLink = ({ text, to }: HeaderLinkProps) => {
	return (
		<>
			<Link className="pr-3" to={to}>
				{text}
			</Link>
		</>
	);
};

export default HeaderLink;
