import { gql } from '@apollo/client'

export const GET_POST = gql`
	query Posts($slug: String!) {
		posts(sort: "publishedAt:desc", pagination: { limit: 1 }, filters: { slug: { eq: $slug } }) {
			data {
				id
				attributes {
					title
					slug
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
