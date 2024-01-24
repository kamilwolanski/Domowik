﻿namespace Domowik___WebAPI.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; }

        public int? FamilyId { get; set; }
        public virtual Family? Family { get; set; }

    }
}
