module.exports = {
	ci: {
		collect: {
			url: ['http://localhost:3000', 'http://localhost:3000/app'],
			startServerCommand: 'npm run preview'
		},
		upload: {
			target: 'temporary-public-storage'
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'csp-xss': 'off',
				'uses-text-compression': 'off',
				'unused-css-rules': 'off',
				'unused-javascript': 'off'
			}
		}
	}
};
