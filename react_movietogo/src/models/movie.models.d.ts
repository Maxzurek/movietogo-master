import { UserDTO } from "./authentication.models";

// Movie
export interface MovieDTO{
    id: number;
    theMovieDbId: number;
    voteAverage: number;
    voteCount: number;
    movieReviews: MovieReviewDTO[];
}

// TheMovieDb Movie
export interface TheMovieDbDTO{
    adult: string;
    backdrop_path: string;
    genre_ids: string;
    original_language: string;
    original_title: string;
    poster_path: string;
    vote_count: number;
    video: boolean;
    vote_average: number;
    title: string;
    overview: string;
    id: number;
    release_date: string;
    popularity: number;
    media_type: string;
}

// MovieToGo Movies 
export interface MovieToGoDTO{
    id: number;
    theMovieDbId: number;
    voteAverage: number;
    voteCount: number;
    movieReviews: MovieReviewDTO | undefined;
    movieVote: MovieVoteDTO | undefined;
}
export interface MovieCreationDTO{
    theMovieDbId: number;
}
export interface MovieUpdateDTO{
    theMovieDbId: number;
    voteAverage: number;
    voteCount: number;
}

// MovieVotes
export interface MovieVoteDTO{
    id: number;
    vote: number;
    user: UserDTO;
    movieId: number;
}
export interface MovieVoteCreationDTO{
    vote: number;
    movieId: number;
}
export interface MovieVoteUpdateDTO{
    vote: number;
}

// MovieReviews
export interface MovieReviewDTO{
    id: number;
    body: string;
    dateCreated: Date;
    movieId: number;
    user: UserDTO;
}
export interface MovieReviewCreationDTO{
    body: string;
    dateCreated: Date;
    movieId: number;
}
export interface MovieReviewCreationDTO{
    body: string;
}

// Data transfert between pages
export interface MovieDetailsData {
    theMovieDbData: TheMovieDbDTO | undefined;
    movieToGoData: MovieToGoDTO | undefined
}
