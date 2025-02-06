import { useLocation } from 'wouter';

export const useNavigate = () => {
    return useLocation()[1];
};
