import React, { useCallback, useState } from 'react';
import { Stack, Text, ThemeProvider, Select, Autocomplete, Card } from '@sanity/ui';
import { StringInputProps, definePlugin, defineType, set, unset } from 'sanity';
import {
	parseZonedDateTime,
	ZonedDateTime,
	now,
	getLocalTimeZone,
	toCalendarDateTime,
	toZoned
} from '@internationalized/date';
import DateTimePicker from './dateTimePicker';

function LocalDateInputComponent({ value, ...props }: StringInputProps) {
	// @ts-expect-error
	const timezonesList = Intl.supportedValuesOf('timeZone') as string[];
	let valueZonedDT: ZonedDateTime;
	const nowLocal = now(getLocalTimeZone());

	try {
		valueZonedDT = value ? parseZonedDateTime(value) : nowLocal;
	} catch {
		console.error('parse error');
		valueZonedDT = nowLocal;
	}

	const [dateState, setDateState] = useState(valueZonedDT);
	const currentTimezone = dateState.timeZone;

	console.log('valueZonedDatetime:', valueZonedDT);
	console.log('dateState:', dateState);

	const handleTimezoneChange = useCallback(
		(timezone: string) => {
			const plainDateTime = toCalendarDateTime(dateState);
			const newDate = toZoned(plainDateTime, timezone);
			setDateState(newDate);

			console.log('handling change', newDate);
			const nextValue = newDate.toString();
			console.log('nextValue', nextValue);
			props.onChange(nextValue ? set(nextValue) : unset());
		},
		[props.onChange, dateState]
	);

	const handleChange = useCallback(
		(newDate: ZonedDateTime) => {
			console.log('handling change', newDate);

			const nextValue = newDate.toString();

			try {
				// check that the date is valid
				const check = parseZonedDateTime(nextValue);
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
