using Domowik___WebAPI.Entities;

namespace Domowik___WebAPI.Models
{
    public class FamilyDto
    {
        public FamilyDto(int id, string name, int headId, IEnumerable<FamilyUserDto> members)
        {
            Id = id;
            Name = name;
            Members = members;
            HeadId = headId;
        }

        public int Id { get; }
        public string Name { get; }
        public int HeadId { get; }

        public IEnumerable<FamilyUserDto> Members { get; }
    }
}
