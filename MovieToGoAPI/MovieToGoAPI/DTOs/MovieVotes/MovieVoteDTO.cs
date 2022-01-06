﻿using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.Users;

namespace MovieToGoAPI.DTOs.MovieVotes
{
    public class MovieVoteDTO
    {
        public int Id { get; set; }

        public int Vote { get; set; }


        public UserDTO UserDTO { get; set; }

        public MovieDTO MovieDTO { get; set; }
    }
}
