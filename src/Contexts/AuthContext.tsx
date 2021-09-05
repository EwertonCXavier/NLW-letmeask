import {createContext, ReactNode, useState, useEffect} from 'react';
import {firebase, auth} from '../Services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; // Todo método assíncrono devolve uma 'Promise'
}

type AuthContextProviderProps = {
    children: ReactNode;
}


export const AuthContext  = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const { displayName, photoURL, uid} = user;
  
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
  
        return () => {
          unsubscribe();
  
          // Toda vez que você declara um EventListener, você tem a obrigação de se descadastrar desse método no final
        }
        }
      })
    }, [user]); // Primeiro argumento é a lógica a ser desenvolvida, o segundo, quando deve ocorrer (que variável deve ser monitorada dentro do array)
    // Se vazio, ele roda apenas uma vez
  
    async function signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider(); // Permite instanciar uma autenticação via Google no sistema
      //Abre um popup do Gmail
      const result = await auth.signInWithPopup(provider);
      console.log(result);
  
      if(result.user) {
        const { displayName, photoURL, uid} = result.user;
  
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }
    return (
        <AuthContext.Provider value={{
            user, signInWithGoogle
          }}>

              {props.children}
        </AuthContext.Provider>
    )
}