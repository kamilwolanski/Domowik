﻿namespace Domowik___WebAPI.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
