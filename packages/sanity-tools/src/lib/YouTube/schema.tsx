import { defineType, PreviewProps } from 'sanity';
import { Box, Stack, Text } from '@sanity/ui';

const Preview = ({ value }: PreviewProps & { value: { id?: string; title?: string } }) => {
	const { id, title } = value ?? { id: '', title: '' };
	return (
		<Stack space={1}>
			<Box padding={1}>
				<Text weight="semibold" size={1}>
					YouTube
				</Text>
			</Box>
			<div
				style={{
					position: 'relative',
					paddingBottom: '56.25%',
					height: '0',
					overflow: 'hidden'
				}}
			>
				{id ? (
					<Box>
						<iframe
							loading="lazy"
							src={`https://www.youtube.com/embed/${id}`}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								border: 0
							}}
							allowFullScreen
							title={title}
						/>
					</Box>
				) : null}
			</div>
		</Stack>
	);
};

export default defineType({
	name: 'youtube',
	type: 'object',
	title: 'YouTube Embed',
	fields: [
		{ name: 'title', type: 'string', title: 'iframe title' },
		{
			name: 'id',
			type: 'string',
			title: 'YouTube Video ID'
		}
	],
	preview: {
		select: { id: 'id', title: 'title' }
	},
	components: { preview: Preview }
});
