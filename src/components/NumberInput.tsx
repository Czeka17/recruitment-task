import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
interface NumberInputComponentProps {
	numElements: number;
	setNumElements: React.Dispatch<React.SetStateAction<number>>;
}
function NumberInputComponent({numElements,setNumElements}:NumberInputComponentProps) {
	return (
		<NumberInput
			defaultValue={numElements.toString()}
			min={10}
			max={20}
			padding={"0.5em"}
			onChange={(valueString) => {
				const value = parseInt(valueString);
				if (value >= 10 && value <= 20) {
					setNumElements(value);
				}
				if (value <= 10) {
					setNumElements(10);
				}
				if (value >= 20) {
					setNumElements(20);
				}
			}}
		>
			<NumberInputField />
			<NumberInputStepper>
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
		</NumberInput>
	);
}
export default NumberInputComponent;
