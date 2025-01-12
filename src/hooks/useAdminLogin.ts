import { AdminLoginProps } from "@/interface/AdminLogin";
import APIClient, { ApiError, ApiRes } from "@/utils/api-client";
import { useMutation } from "@tanstack/react-query";
import useToastMessages from "./useToastMessages";
import useAdminStore from "@/stores/admin-store";
import { useNavigate } from "react-router-dom";

interface Res extends ApiRes {
	data: {
		title: string
		full_name: string
		fellowship: string
		senior_cell?: string | null
	}
}
const api = new APIClient<Res>("/tracking/tie-login");

const useAdminLogin = () => {
	const navigate = useNavigate()
	const { setIsLoggedIn } = useAdminStore();
	const { error, success } = useToastMessages();

	return useMutation({
		onError: (err: ApiError) => error(err),
		mutationFn: (data: AdminLoginProps) => api.post(data),
		onSuccess: () => {
			setIsLoggedIn(true);
			success('Login', "You have successfully logged in")
			navigate('/dashboard')
		},
	})
}

export default useAdminLogin;