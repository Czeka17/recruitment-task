import { useState, useEffect } from "react";
import "./App.css";
import NumberInputComponent from "./components/NumberInput";
import List from "./components/list";
import Pagination from "./components/pagination";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("ascending");
	const [numElements, setNumElements] = useState(15);
	const [totalPages, setTotalPages] = useState(0);
	const [tags, setTags] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchTags = async () => {
		const apiKey = 'uwuw1WkZ*BMcvSUq3mB3vA(('
		const response = await fetch(
			`https://api.stackexchange.com/2.3/tags?pagesize=100&site=stackoverflow&key=${apiKey}`
		);
		try {
			if (response.ok) {
				const data = await response.json();
				setTags(data.items);
				setIsLoading(false);
				setError(false);
				setTotalPages(Math.ceil(data.items.length / numElements));
			} else {
				setIsLoading(false);
				setError(true);
				console.error("Response not ok:", response);
			}
		} catch (error) {
			console.error("Error fetching tags:", error);
		}
	};

	useEffect(() => {
		fetchTags();
	}, []);

	useEffect(() => {
		setTotalPages(Math.ceil(tags.length / numElements));
	}, [numElements]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const startIndex = (currentPage - 1) * numElements;
	const endIndex = Math.min(startIndex + numElements, tags.length);

	const sortTags = (tags: any) => {
		let sortedTags = [...tags];
		if (sortBy === "name") {
			sortedTags.sort((a, b) => {
				return sortOrder === "ascending"
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			});
		} else if (sortBy === "count") {
			sortedTags.sort((a, b) => {
				return sortOrder === "ascending"
					? parseInt(a.count) - parseInt(b.count)
					: parseInt(b.count) - parseInt(a.count);
			});
		}
		return sortedTags;
	};

	return (
		<main>
			<div className='App'>
				<ChakraProvider>
					<h1>Stackoverflow Tag List</h1>
					{isLoading && <Spinner size='xl' />}
					{!isLoading && !error && (
						<div className='container'>
							<div className='flexbox'>
								<div>
									<Text
										fontSize='sm'
										color='gray.500'
										mb={2}
									>
										Filters
									</Text>
									<Filters
										sortBy={sortBy}
										setSortBy={setSortBy}
										sortOrder={sortOrder}
										setSortOrder={setSortOrder}
									/>
								</div>

								<div>
									<Text
										fontSize='sm'
										color='gray.500'
										mb={2}
									>
										Items per page
									</Text>

									<NumberInputComponent
										numElements={numElements}
										setNumElements={setNumElements}
									/>
									<Text
										fontSize='sm'
										color='gray.500'
										mb={2}
									>
										Please select a number between 10 and 20
									</Text>
								</div>
							</div>
							<Text
								fontSize='sm'
								color='gray.500'
								mb={2}
							>
								Pages
							</Text>
							<Pagination
								totalPages={totalPages}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
							/>

							<List
								startIndex={startIndex}
								endIndex={endIndex}
								tags={tags}
								sortTags={sortTags}
							/>
						</div>
					)}
					{error && !isLoading && (
						<div className='error'>
							<p>Something went wrong!</p>
							<p>Reload page and try again!</p>
						</div>
					)}
				</ChakraProvider>
			</div>

			<Footer />
		</main>
	);
}

export default App;
