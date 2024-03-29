import React from 'react';
import { DatePickerProps, DateValue } from 'react-aria-components';
import {
	DatePicker,
	Group,
	Button,
	Popover,
	Dialog,
	Calendar,
	Heading,
	CalendarGrid,
	CalendarCell,
	Text,
	DateInput,
	Label,
	DateSegment
} from 'react-aria-components';
import { Box, Card, Flex, Button as SanityButton, studioTheme } from '@sanity/ui';
import styled, { ThemeProvider } from 'styled-components';
import { CalendarIcon, CloseIcon } from '@sanity/icons';

export interface DateTimePickerProps<T extends DateValue> extends DatePickerProps<T> {
	label?: string;
	description?: string;
	errorMessage?: string;
	clearValue: () => void;
}

const ThemeVarsStyled = styled.div`
	${(props) => {
		let theme = props.theme as typeof studioTheme;

		const templateLiteral = `
--card-accent-fg-color: ${theme.color.dark.positive.card.selected.accent.fg};
--card-border-color: ${theme.color.dark.default.card.enabled.border};
--card-bg-color: ${theme.color.dark.default.card.enabled.bg};
--input-fg-color: ${theme.color.dark.default.input.default.enabled.fg};
--card-fg-color: ${theme.color.dark.default.card.enabled.fg};
--input-placeholder-color: ${theme.color.dark.default.input.default.enabled.placeholder};
--card-muted-fg-color: ${theme.color.dark.default.card.enabled.muted.fg};
--page-background: ${theme.color.dark.default.base.bg};
font-family: ${theme.fonts.text.family};
`;

		return templateLiteral;
	}}
`;

function DateTimePicker<T extends DateValue>({
	label,
	description,
	errorMessage,
	granularity = 'minute',
	clearValue,
	...props
}: DateTimePickerProps<T>) {
	return (
		<ThemeProvider theme={studioTheme}>
			<ThemeVarsStyled>
				<DatePicker granularity={granularity} {...props}>
					<Label>{label}</Label>
					<Group>
						<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
						<Card border>
							<Flex>
								<Box padding={1}>
									<SanityButton
										aria-label="Clear"
										data-qa="clear-button"
										fontSize={2}
										icon={CloseIcon}
										mode="bleed"
										padding={2}
										onClick={() => {
											clearValue();
										}}
										// onMouseDown={handleClearMouseDown}
									/>
								</Box>
								<Button>
									<CalendarIcon />
								</Button>
							</Flex>
						</Card>
					</Group>
					{description && <Text slot="description">{description}</Text>}
					{errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
					<ThemeVarsStyled as={Popover} className="react-aria-Popover">
						<Dialog>
							<Calendar>
								<header>
									<Button slot="previous">◀</Button>
									<Heading />
									<Button slot="next">▶</Button>
								</header>
								<CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
								{errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
							</Calendar>
						</Dialog>
					</ThemeVarsStyled>
				</DatePicker>
			</ThemeVarsStyled>
		</ThemeProvider>
	);
}

export default DateTimePicker;
