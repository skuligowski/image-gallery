import { Context, createContext, ReactNode, useEffect, useState } from "react";
import { Album } from "../types/api";

export const AlbumsContext: Context<{ albums: Album[] }> = createContext(null as any);

export const AlbumsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    useEffect(() => {
        fetch('/api/albums')
          .then(resp => resp.json())
          .then(albums => setAlbums(albums));
      }, []);
    return (
        <AlbumsContext.Provider value={ { albums } }>
            {children}
        </AlbumsContext.Provider>
    );
}