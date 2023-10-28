import { gql } from '@apollo/client'

export const GET_POST = gql`
	query Posts($slug: String!) {
		posts(sort: "publishedAt:desc", pagination: { limit: 1 }, filters: { slug: { eq: $slug } }) {
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
