﻿using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.MovieVotes
{
    public class MovieVoteCreationDTO
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        [Required(ErrorMessage = "The field {0} is required")]
        [Range(-1, 1)]
        public int Vote { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int TheMovieDbId { get; set; }
    }
}
