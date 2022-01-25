import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown, Grid, GridColumn, GridRow, Header, Icon, Image, Item, Menu, MenuItem } from "semantic-ui-react";
import { adminRole } from "../../roles";
import Authorized from "../authentication/Authorized";
import { logout } from "../authentication/handleJWT";
import AuthenticationContext from "../contexts/AuthenticationContext";
import ModalContext from "../contexts/ModalContext";
import TheMovieDbSearchBar from "../utilities/TheMovieDbSearchBar";

export default function MainNavbar() {

    const { claims, update } = useContext(AuthenticationContext);
    const { displayAuthenticationModal } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        update([]);
    }

    const getLoggedInUsernameAndRole = () => {

        const userName = claims.filter(x => x.name === 'username')[0]?.value;
        const role = claims.filter(x => x.name === 'role')[0]?.value;

        return `${userName}${role? ' ('+role+')': ""}`;
    }

    return (
        <>
            <Grid as={Menu} stackable pointing secondary size='large' icon='labeled' color="blue" verticalAlign="bottom">
                <GridRow style={{ padding: 0 }}>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/'>
                            <Image src="/images/MovieToGo_Logo.ico" size="tiny" />
                        </Item>
                    </GridColumn>
                    <GridColumn width={2}>
                    </GridColumn>
                    <GridColumn width={1}>
                    </GridColumn>
                    <GridColumn width={6}>
                        <TheMovieDbSearchBar />
                    </GridColumn>
                    <GridColumn width={1}>
                    </GridColumn>
                    <GridColumn width={2}>
                        <Authorized
                            authorized={
                                <Dropdown
                                    item
                                    trigger={<><Icon name='user outline' />{getLoggedInUsernameAndRole()}</>}
                                    icon={null}
                                >
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='list' text=' WatchLists' name="watchLists" onClick={() => navigate('/watchlist')} />
                                        <Authorized 
                                            authorized={ <Dropdown.Item icon='wrench' text=' Admin Tools' name="adminTools" onClick={() => navigate('/dev')} />}
                                            role={adminRole}
                                        />
                                        <Dropdown.Item icon='sign out' text=' Logout' name="logout" onClick={handleLogoutClick} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                            notAuthorized={
                                <MenuItem onClick={() => displayAuthenticationModal(true)}>
                                    <Icon name='sign in' />
                                    Login
                                </MenuItem>
                            }
                        />
                    </GridColumn>
                    <GridColumn width={2}>
                        <Item as={NavLink} to='/dev' >
                            <Header>DevTools</Header>
                        </Item>
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
};