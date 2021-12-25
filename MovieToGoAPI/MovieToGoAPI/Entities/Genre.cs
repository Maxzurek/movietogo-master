﻿using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class Genre
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage ="The field {0} is required")]
        [StringLength(50)]
        public string Designation { get; set; }
    }
}
