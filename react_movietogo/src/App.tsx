import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'semantic-ui-react';
import routes from './routeConfig';
import { Claim } from './models/authentication.models';
import AuthenticationContext from './components/contexts/AuthenticationContext';
import MainNavbar from './components/navigation/MainNavbar';
import { useEffect, useState } from 'react';
import { getClaims } from './components/authentication/handleJWT';
import ModalContext from './components/contexts/ModalContext';
import AuthenticationModal from './components/modals/AuthenticationModal';
import OkMessageModal from './components/modals/OkMessageModal';
import configureInterceptor from './components/authentication/httpInterceptor';
import { GenresDTO } from './models/movie.models';
import { WatchListDTO } from './models/watchlist.models';
import axios, { AxiosError } from 'axios';
import { movieToGoUrlWatchListsUser, theMovieDbGenres } from './endpoints';
import AppDataContext from './components/contexts/AppDataContext';
import { useStateIfMounted } from 'use-state-if-mounted';
import RedirectionPage from './components/navigation/RedirectionPage';
import { adminRole, loggedInUser } from './roles';
import MediaProvider from './components/mediaContexr/MediaProvider';
import DisplayApiErrors from './components/utilities/DisplayApiErrors';

configureInterceptor();

export default function App() {

  const [claims, setClaims] = useState<Claim[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isOkMessageModalOpen, setOkMessageModalOpen] = useState(false);
  const [okMessageModalContent, setOkMessageModalContent] = useState('');

  const [genresDTO, setGenresDTO] = useStateIfMounted<GenresDTO[]>([]);
  const [userWatchListDTO, setUserWatchListDTO] = useStateIfMounted<WatchListDTO[] | undefined>(undefined);
  const [fetchError, setFetchError] = useStateIfMounted<AxiosError | undefined>(undefined);

  useEffect(() => {

    setClaims(getClaims);
    fetchTheMovieDbGenres();

  }, [])

  useEffect(() => {

    if (okMessageModalContent) {
      setOkMessageModalOpen(true);
    }

  }, [okMessageModalContent])

  useEffect(() => {

    if (claims.length > 0) {
      fetchUserWatchListDTO();
    }
    else {
      setUserWatchListDTO(undefined);
    }

  }, [claims])

  const fetchTheMovieDbGenres = async () => {

    await axios.get(theMovieDbGenres)

      .then((response) => {
        setFetchError(undefined)
        setGenresDTO(response.data.genres)
      })
      .catch(error => setFetchError(error))
  }

  const fetchUserWatchListDTO = async () => {
    if (claims.length > 0) {
      await axios.get(movieToGoUrlWatchListsUser)
        .then(response => {
          setFetchError(undefined)
          setUserWatchListDTO(response.data)
        })
        .catch(error => setFetchError(error))
    }
  }

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === adminRole) > -1;
  }

  function getElement(requiredRole: string, componentToRender: JSX.Element) {
    if (requiredRole.length === 0) {
      return componentToRender;
    }
    if (requiredRole === adminRole && isAdmin()) {
      return componentToRender;
    }
    if (requiredRole === loggedInUser && claims.length > 0) {
      return componentToRender;
    }

    return <RedirectionPage />;
  }

  return (
    <BrowserRouter>
      <MediaProvider>
        <AppDataContext.Provider
          value={{
            genresDTO,
            setGenresDTO: setGenresDTO,
            userWatchListDTO,
            setUserWatchListDTO: setUserWatchListDTO,
          }}
        >
          <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
            <ModalContext.Provider
              value={{
                isAuthModalOpen,
                setAuthModalOpen: setAuthModalOpen,
                isOkMessageModalOpen,
                setOkMessageModalOpen: setOkMessageModalOpen,
                okMessageModalContent,
                setOkMessageModalContent: setOkMessageModalContent,
                displayAuthenticationModal: setAuthModalOpen,
                displayOkMessage: setOkMessageModalContent,
              }}
            >

              <MainNavbar />
              {/* <DisplayApiErrors error={fetchError} /> TODO centralize API calls inside 1 provider and display errors if any */}

              <Container fluid>
                <Routes>
                  {routes.map(route =>
                    <Route
                      key={route.path}
                      path={route.path}
                      element={getElement(route.requiredRole, route.component)}>
                    </Route>)}
                </Routes>
              </Container>

              <AuthenticationModal open={isAuthModalOpen} setOpen={setAuthModalOpen} defaultSelection="login" />
              <OkMessageModal message={okMessageModalContent} setMessage={setOkMessageModalContent} open={isOkMessageModalOpen} setOpen={setOkMessageModalOpen} />
            </ModalContext.Provider>
          </AuthenticationContext.Provider>
        </AppDataContext.Provider>
      </MediaProvider>
    </BrowserRouter>
  )
};
