/* eslint-disable no-undef */
import axios from 'axios';

async function getNewToken() {
	try {
		const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
			grant_type: 'client_credentials',
			client_id: `${process.env.VITE_CLIENT_ID}`,
			client_secret: `${process.env.VITE_CLIENT_SECRET}`,
		});

		process.env.VITE_CLIENT_TOKEN = response.data.access_token;
		return response.data.access_token;
	} catch (error) {
		return {
			statusCode: error.response.status,
			body: JSON.stringify(error.response.data),
		};
	}
}

exports.handler = async function (event, context) {
	const API_URL = 'https://api.petfinder.com/v2/animals';
	const API_TOKEN = `${process.env.VITE_CLIENT_TOKEN}`;

	const { type, sort, limit } = event.queryStringParameters;

	try {
		const response = await axios.get(`${API_URL}?type=${type}&sort=${sort}&limit=${limit}`, {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
			},
		});

		return {
			statusCode: 200,
			body: JSON.stringify(response.data),
		};
	} catch (error) {
		if (error.response.status === 401) {
			getNewToken();
			return await exports.handler(event, context);
		}
		return {
			statusCode: error.response.status,
			body: JSON.stringify(error.response.data),
		};
	}
};
