﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace MovieToGoAPI
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
