import React from 'react';
import type { DatePickerProps, DateValue } from 'react-aria-components';
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
import { Card, studioTheme } from '@sanity/ui';
import styled, { ThemeProvider } from 'styled-components';

export interface DateTimePickerProps<T extends DateValue> extends DatePickerProps<T> {
	label?: string;
	description?: string;
	errorMessage?: string;
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
						<Button>▼</Button>
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
