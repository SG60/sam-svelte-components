import React, { useCallback, useState } from 'react';
import { Stack, Text, ThemeProvider, Autocomplete, Card } from '@sanity/ui';
import { definePlugin, defineType, set, unset, ObjectInputProps } from 'sanity';
import {
	parseZonedDateTime,
	ZonedDateTime,
	now,
	getLocalTimeZone,
	toCalendarDateTime,
	toZoned
} from '@internationalized/date';
import DateTimePicker from './dateTimePicker';

function createLocalDatetimeObject(datetime: ZonedDateTime) {
	return {
		datetimeZoned: datetime.toString(),
		datetimeUTC: datetime.toAbsoluteString()
	};
}

function LocalDateInputComponent({ value, ...props }: ObjectInputProps<Fields>) {
	// @ts-expect-error
	const timezonesList = Intl.supportedValuesOf('timeZone') as string[];

	const localTimezone = getLocalTimeZone();
	const nowLocal = now(localTimezone);
	const datetime = value?.datetimeZoned;

	let valueZonedDT: ZonedDateTime;
	try {
		valueZonedDT = datetime ? parseZonedDateTime(datetime) : nowLocal;
	} catch {
		console.error('parse error');
		valueZonedDT = nowLocal;
	}

	const [dateState, setDateState] = useState(valueZonedDT);
	const currentTimezone = dateState.timeZone;

	const handleTimezoneChange = useCallback(
		(timezone: string) => {
			const plainDateTime = toCalendarDateTime(dateState);
			const newDate = toZoned(plainDateTime, timezone);
			setDateState(newDate);

			console.log('handling change', newDate);
			const nextValue = createLocalDatetimeObject(newDate);
			console.log('nextValue', nextValue);
			props.onChange(nextValue ? set(nextValue) : unset());
		},
		[props.onChange, dateState]
	);

	const handleChange = useCallback(
		(newDate: ZonedDateTime) => {
			console.log('handling change', newDate);

			const nextValue = createLocalDatetimeObject(newDate);

			try {
				// check that the date is valid
				const check = parseZonedDateTime(nextValue.datetimeZoned);
				console.log(check);

				console.log('nextValue', nextValue);
				props.onChange(nextValue ? set(nextValue) : unset());
			} catch {}

			setDateState(newDate);
		},
		[props.onChange]
	);

	return (
		<ThemeProvider>
			<Stack space={2}>
				<DateTimePicker value={dateState} onChange={handleChange} />
				<Autocomplete
					id="timezone-autocomplete"
					onSelect={handleTimezoneChange}
					openButton
					placeholder={currentTimezone.replace('_', ' ')}
					renderOption={(option) => <Card as="button">{option.value.replace('_', ' ')}</Card>}
					options={timezonesList.map((value) => ({ value }))}
				/>
				<Text>
					{dateState.toDate().toLocaleString(undefined, {
						timeZone: dateState.timeZone,
						dateStyle: 'full',
						timeStyle: 'short',
						hour12: true
					})}
				</Text>
			</Stack>
		</ThemeProvider>
	);
}

type Fields = {
	datetimeZoned: string;
	datetimeUTC: string;
};

const localDateTimeType = defineType({
	name: 'local-datetime',
	type: 'object',
	fields: [
		{ name: 'datetimeZoned', type: 'string' },
		{ name: 'datetimeUTC', type: 'datetime' }
	],
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
