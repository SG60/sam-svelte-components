import React, { useCallback, useState } from 'react';
import { Stack, Text, ThemeProvider, Autocomplete, Card } from '@sanity/ui';
import {
	definePlugin,
	defineType,
	set,
	unset,
	ObjectInputProps,
	DiffFromTo,
	DiffComponent,
	ObjectDiff,
	FieldPreviewComponent
} from 'sanity';
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

const LocalDateInputComponent: React.ComponentType<ObjectInputProps> = ({ value, ...props }) => {
	// @ts-expect-error
	const timezonesList = Intl.supportedValuesOf('timeZone') as string[];

	const localTimezone = getLocalTimeZone();
	const nowLocal = now(localTimezone);
	const datetime = value?.datetimeZoned;

	let valueZonedDT: ZonedDateTime | null;
	try {
		valueZonedDT = datetime ? parseZonedDateTime(datetime) : null;
	} catch {
		console.error('parse error');
		valueZonedDT = null;
	}

	const [dateState, setDateState] = useState(valueZonedDT);
	const [currentTimezone, setCurrentTimezone] = useState(dateState?.timeZone ?? localTimezone);

	const handleTimezoneChange = useCallback(
		(timezone: string) => {
			const plainDateTime = toCalendarDateTime(dateState ?? nowLocal);
			const newDate = toZoned(plainDateTime, timezone);
			setDateState(newDate);
			setCurrentTimezone(timezone);

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
				<DateTimePicker
					value={dateState}
					placeholderValue={now(currentTimezone)}
					onChange={handleChange}
					clearValue={() => {
						setDateState(null);
						props.onChange(unset());
					}}
				/>
				<Autocomplete
					id="timezone-autocomplete"
					onSelect={handleTimezoneChange}
					openButton
					placeholder={currentTimezone.replace('_', ' ')}
					renderOption={(option) => <Card as="button">{option.value.replace('_', ' ')}</Card>}
					options={timezonesList.map((value) => ({ value }))}
				/>
				<Text>
					{dateState?.toDate().toLocaleString(undefined, {
						timeZone: dateState.timeZone,
						hour12: true,
						weekday: 'long',
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: 'numeric',
						timeZoneName: 'short'
					})}
				</Text>
			</Stack>
		</ThemeProvider>
	);
};

const CustomDiffComponent: DiffComponent<ObjectDiff<Fields>> = ({ diff, schemaType }) => {
	return (
		<DiffFromTo
			diff={diff}
			schemaType={schemaType}
			previewComponent={CustomPreviewComponent}
			layout="grid"
		/>
	);
};

const CustomPreviewComponent: FieldPreviewComponent<Fields> = ({ value }) => {
	let valueZonedDT: ZonedDateTime | null;
	try {
		valueZonedDT = value.datetimeZoned ? parseZonedDateTime(value.datetimeZoned) : null;
	} catch {
		console.error('parse error');
		valueZonedDT = null;
	}

	return (
		<Text>
			{valueZonedDT?.toDate().toLocaleString(undefined, {
				timeZone: valueZonedDT.timeZone,
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: 'numeric',
				hour12: false,
				timeZoneName: 'short'
			})}
		</Text>
	);
};

interface Fields {
	datetimeZoned: string;
	datetimeUTC: string;
}

const localDateTimeType = defineType({
	name: 'local-datetime',
	type: 'object',
	fields: [
		{ name: 'datetimeZoned', type: 'string' },
		{ name: 'datetimeUTC', type: 'datetime' }
	],
	components: { input: LocalDateInputComponent, diff: CustomDiffComponent }
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
