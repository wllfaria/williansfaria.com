import { gql } from '@apollo/client'

export const GET_POST = gql`
	query Posts($slug: String!, $locale: I18NLocaleCode!) {
		posts(locale: $locale, sort: "publishedAt:desc", pagination: { limit: 1 }, filters: { slug: { eq: $slug } }) {
			data {
				id
				attributes {
					title
					slug
					locale
					createdAt
					cover {
						data {
							attributes {
								url
							}
						}
					}
					content
					excerpt
					tags {
						data {
							id
							attributes {
								name
								color
							}
						}
					}
				}
			}
		}
	}
`
