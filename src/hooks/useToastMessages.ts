import { toaster } from "@/components/ui/toaster";
import { ApiError } from "../utils/api-client";


const useToastMessages = () => {

	const error = ({ response }: ApiError) => toaster.create({ type: 'error', title: response?.data.statusCode, description: response?.data.message });
	const info = (title: string, des: string) => toaster.create({ type: 'info', title, description: des });
	const success = (title: string, des: string) => toaster.create({ type: 'success', title, description: des });
	const loading = (title: string, des: string) => toaster.create({ type: 'loading', title, description: des });
	const warning = (title: string, des: string) => toaster.create({ type: 'warning', title, description: des });

	return { error, info, loading, warning, success, }
};

export default useToastMessages;
