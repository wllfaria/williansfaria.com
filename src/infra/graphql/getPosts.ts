import { gql } from '@apollo/client'

export const GET_POSTS = gql`
	query Posts {
		posts(sort: "publishedAt:desc", pagination: { limit: 10 }, filters: { publishedAt: { notNull: true } }) {
			data {
				id
				attributes {
					title
					slug
					cover {
						data {
							attributes {
								url
							}
						}
					}
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
