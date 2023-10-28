import { gql } from '@apollo/client'

export const GET_POST_SLUGS = gql`
	query Posts($locale: I18NLocaleCode!) {
		posts(locale: $locale, pagination: { limit: 99999 }) {
			data {
				attributes {
					slug
				}
			}
		}
	}
`
