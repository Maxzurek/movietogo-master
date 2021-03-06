import { Link } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Segment } from "semantic-ui-react";
import { WatchListDTO } from "../../models/watchlist.models";
import IndividualMovie from "../utilities/IndividualMovie";

interface WatchListItemContainerProps {
    watchListDTO: WatchListDTO;
}

export default function WatchListItemContainer(props: WatchListItemContainerProps) {

    return (
        <>
            <Segment color="teal" inverted textAlign="center">
                <Header as='h1'>{props.watchListDTO.name}</Header>
            </Segment>
            <Grid centered style={{ textAlign: 'left' }}>
                {props.watchListDTO.watchListItems && props.watchListDTO.watchListItems.length > 0 ?

                    props?.watchListDTO?.watchListItems?.map((watchListItemDTO, index) => {
                        return (
                            <IndividualMovie
                                key={index}
                                theMovieDbDTO={watchListItemDTO.theMovieDbDTO}
                                movieToGoDTO={watchListItemDTO.movie}
                                itemId={index.toString()}
                                isInWatchList
                                watchListItemDTO={watchListItemDTO}
                                watchListId={props.watchListDTO.id}
                            />
                        )
                    })
                    :
                    <Container fluid textAlign="center" style={{ marginTop: 30 }}>
                        <Header>This watchlist is empty ...</Header>
                        <Divider />
                        <Link to={"/"}>
                            <Button fluid>Discover movies now!</Button>
                        </Link>

                    </Container>
                }
            </Grid>
        </>
    );
};        