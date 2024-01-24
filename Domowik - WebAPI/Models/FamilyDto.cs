using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class FamilyDto
    {
        public FamilyDto(int id, string name, IEnumerable<FamilyUserDto> members)
        {
            Id = id;
            Name = name;
            Members = members;
        }

        public int Id { get; }
        public string Name { get; }

        public IEnumerable<FamilyUserDto> Members { get; }
    }
}
