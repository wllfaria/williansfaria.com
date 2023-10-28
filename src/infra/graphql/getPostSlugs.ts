import { gql } from '@apollo/client'

export const GET_POST_SLUGS = gql`
	query Posts {
		posts(pagination: { limit: 99999 }) {
			data {
				attributes {
					slug
				}
			}
		}
	}
`
