import { Select } from "@chakra-ui/react";
interface FiltersProps {
	sortBy: string;
	setSortBy: (value: string) => void;
	sortOrder: string;
	setSortOrder: (value: string) => void;
}
function Filters({ sortBy, setSortBy, sortOrder, setSortOrder }: FiltersProps) {
	return (
		<div className='flexbox'>
			<Select
			margin={"0.5em"}
				placeholder='Sort by'
				onChange={(e) => setSortBy(e.target.value)}
				value={sortBy}
			>
				<option value='name'>By name</option>
				<option value='count'>By count</option>
			</Select>
			<Select margin={"0.5em"}
				placeholder='Sort order'
				onChange={(e) => setSortOrder(e.target.value)}
				value={sortOrder}
			>
				<option value='ascending'>Ascending</option>
				<option value='descending'>Descending</option>
			</Select>
		</div>
	);
}
export default Filters;
