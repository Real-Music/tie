import { Query, User } from "@/interface/User";
import APIClient from "@/utils/api-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ms from "ms";

interface FetchResponse {
	data: {
		data: User[];
		size: number;
		totalSize: number;
		totalSeniorCell: number;
	}
}

const api = new APIClient<FetchResponse>('/tracking/get-all-users')

const useUsers = (query: Query) => {
	// const status = query.fellowship.toLocaleUpperCase() === 'ALL' ? undefined : query.fellowship.toUpperCase();
	// const params = { ...query, status };

	return useQuery({
		staleTime: ms('5m'),
		queryKey: ['users', query],
		placeholderData: keepPreviousData,
		queryFn: ({ signal }) => api.getAll({ params: query, signal }),
	})
}


export default useUsers;