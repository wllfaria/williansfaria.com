import { gql } from '@apollo/client'

export const GET_POSTS = gql`
	query Posts($locale: I18NLocaleCode!) {
		posts(
			locale: $locale
			sort: "publishedAt:desc"
			pagination: { limit: 10 }
			filters: { publishedAt: { notNull: true } }
		) {
			data {
				id
				attributes {
					title
					slug
					excerpt
					locale
					content
					createdAt
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
