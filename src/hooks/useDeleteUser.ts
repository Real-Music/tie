import APIClient, { ApiError, ApiRes } from "@/utils/api-client";
import { useMutation } from "@tanstack/react-query";
import useToastMessages from "./useToastMessages";
import { useNavigate } from "react-router-dom";

interface Res extends ApiRes {
	data: unknown | null
}
const api = new APIClient<Res>("/tracking/delete-user");

const useDeleteUser = () => {
	const { error, success } = useToastMessages();
	const navigate = useNavigate();

	return useMutation({
		onError: (err: ApiError) => error(err),
		mutationFn: (id: number) => api.delete(id),
		onSuccess: () => {
			success('User Deleted', "The user has successfully been deleted")
			navigate('/dashboard')
		}
		,
	})
}

export default useDeleteUser;