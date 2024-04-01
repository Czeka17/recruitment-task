import { Button } from "@chakra-ui/react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	handlePageChange: (page: number) => void;
}
function Pagination({
	totalPages,
	currentPage,
	handlePageChange,
}: PaginationProps) {
	return (
		<div className='pagination'>
			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(page) => (
					<Button
						key={page}
						background={currentPage === page ? "gray" : "#393E46"}
						margin={"0.5em"}
						color={"white"}
                        _hover={{ background:"gray"}}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</Button>
				)
			)}
		</div>
	);
}
export default Pagination;
