import { Card, CardBody, Text } from "@chakra-ui/react";

interface ListProps {
	tags: tag[];
	startIndex: number;
	endIndex: number;
	sortTags: (tags: tag[]) => tag[];
}
interface tag {
	name: string;
	count: number;
}
function List({ tags, sortTags, startIndex, endIndex }: ListProps) {
	return (
		<ul style={{ padding: "1em" }}>
			{tags.length > 0 &&
				sortTags(tags)
					.slice(startIndex, endIndex)
					.map((tag) => (
						<Card
							key={tag.name}
							backgroundColor={"#00ADB5"}
							margin={"1em"}
							padding={"1em"}
							borderRadius={10}
							_hover={{ transform: "scale(1.02)" }}
							transition={"0.3s"}
						>
							<CardBody>
								<Text color={"white"}>{tag.name}</Text>
								<Text color={"white"}>({tag.count})</Text>
							</CardBody>
						</Card>
					))}
		</ul>
	);
}
export default List;
