import React, { useCallback } from 'react';
import { Container, Stack, Text, TextInput, ThemeProvider, ThemeColorProvider } from '@sanity/ui';
import {
	DateTimeInput,
	StringInput,
	StringInputProps,
	definePlugin,
	defineType,
	set,
	unset
} from 'sanity';
// import {DateTimePicker} from '@mantine/dates'
import {
	DateField,
	DatePicker as SpectrumDatePicker,
	defaultTheme,
	Provider
} from '@adobe/react-spectrum';
import {
	Button,
	Calendar,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DatePicker,
	DateSegment,
	Dialog,
	Group,
	Heading,
	Label,
	Popover
} from 'react-aria-components';
import {
	parseZonedDateTime,
	ZonedDateTime,
	toZoned,
	now,
	getLocalTimeZone
} from '@internationalized/date';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
	--card-bg-color: ${(props) => {
		console.log(props);
		return 'blue';
	}};
`;

function LocalDateInputComponent(props: StringInputProps) {
	const value = props.value;

	const value2 = value ? new Date(value) : undefined;

	const inputProps = { ...props };

	// @ts-expect-error
	console.log(Intl.supportedValuesOf('timeZone'));
	const timezone = getLocalTimeZone();

	console.log(`${value} - ${value2}`);

	const parsed = value ? new Date(`${value}Z`) : undefined;

	let formattedOptions: string[] | undefined;
	if (parsed) {
		try {
			console.log(parsed);
			formattedOptions = [parsed.toISOString()];
		} catch (e) {}
	}

	const handleChange = useCallback(
		(newDate: ZonedDateTime) => {
			console.log('handling change');
			const nextValue = newDate.toString();
			console.log(nextValue);
			props.onChange(nextValue ? set(nextValue) : unset());
		},
		[props.onChange]
	);

	let value3: ZonedDateTime | undefined;

	try {
		value3 = props.value ? parseZonedDateTime(props.value) : undefined;
	} catch {}

	return (
		<ThemeProvider>
			<Stack space={4}>
				<Provider theme={defaultTheme}>
					<SpectrumDatePicker
						onChange={handleChange}
						value={value3}
						granularity="minute"
						showFormatHelpText
						maxVisibleMonths={2}
						isQuiet
						width="100%"
					/>
				</Provider>
				<Text>value: {value}</Text>
			</Stack>
		</ThemeProvider>
	);
}

const localDateTimeType = defineType({
	name: 'local-datetime',
	type: 'string',
	components: { input: LocalDateInputComponent }
});

interface MyPluginConfig {
	/* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-datetime'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const localDateTimePlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
	// eslint-disable-next-line no-console
	console.log('hello from sanity-plugin-datetime');
	return {
		name: 'sanity-plugin-datetime',
		schema: {
			types: [localDateTimeType]
		}
	};
});
