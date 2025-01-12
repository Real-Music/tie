import { NewUser } from "@/interface/User";
import APIClient, { ApiError, ApiRes } from "@/utils/api-client";
import { useMutation } from "@tanstack/react-query";
import useToastMessages from "./useToastMessages";

interface Res extends ApiRes {
	data: {
		title: string
		full_name: string
		fellowship: string
		senior_cell?: string | null
	}
}
const api = new APIClient<Res>("/tracking/register");

const useTieRegistration = () => {
	const { error, success } = useToastMessages();

	return useMutation({
		onError: (err: ApiError) => error(err),
		mutationFn: (data: NewUser) => api.post(data),
		onSuccess: () => success('New Registration', "You have successfully registered"),
	})
}

export default useTieRegistration;