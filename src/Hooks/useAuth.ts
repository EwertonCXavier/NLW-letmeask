import { useContext } from 'react';
import {AuthContext} from '../Contexts/AuthContext';


export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}