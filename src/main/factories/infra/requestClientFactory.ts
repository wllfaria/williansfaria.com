import { RequestClient } from '@/domain/contracts/requestClient'
import { ApolloRequestClient } from '@/infra/apolloRequestClient'

export class RequestClientFactory {
	public static make(): RequestClient {
		return new ApolloRequestClient()
	}
}
