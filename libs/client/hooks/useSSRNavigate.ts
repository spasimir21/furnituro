import { useNonServerHook } from './useNonServerHook';
import { useNavigate } from 'react-router-dom';

const useSSRNavigate = () => useNonServerHook(useNavigate, () => {});

export { useSSRNavigate };
