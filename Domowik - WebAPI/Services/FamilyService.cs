using AutoMapper;
using Domowik___WebAPI.Data;
using Domowik___WebAPI.Entities;
using Domowik___WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Services
{
    public interface IFamilyService
    {
        FamilyDto GetById(int id);
        IEnumerable<FamilyDto> GetAll();
        int Create(CreateFamilyDto createFamilyDto);
        bool Delete(int id);
        bool Update(int id, UpdateFamilyDto updateFamilyDto);
    }
    public class FamilyService : IFamilyService
    {
        private readonly DomowikDbContext _dbContext;
        private readonly IMapper _mapper;

        public FamilyService(DomowikDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public bool Update(int id, UpdateFamilyDto updateFamilyDto)
        {
            var family = _dbContext.Families.FirstOrDefault(f => f.Id == id);

            if(family == null)
            {
                return false;
            }

            family.Name = updateFamilyDto.Name;

            _dbContext.SaveChanges();

            return true;

        }

        public bool Delete(int id)
        {
            var family = _dbContext.Families.FirstOrDefault(f => f.Id == id);

            if(family == null)
            {
                return false;
            }

            _dbContext.Families.Remove(family);
            _dbContext.SaveChanges();

            return true;

        }
        public FamilyDto GetById(int id)
        {
            var family = _dbContext.Families.Include(f => f.Members).FirstOrDefault(x => x.Id == id);

            if(family == null)
            {
                return null;
            }

            var result = _mapper.Map<FamilyDto>(family);

            return result;
        }

        public IEnumerable<FamilyDto> GetAll()
        {
            var families = _dbContext.Families.Include(f => f.Members).ToList();

            var familiesDtos = _mapper.Map<List<FamilyDto>>(families);

            return familiesDtos;
        }

        public int Create(CreateFamilyDto createFamilyDto)
        {
            var family = _mapper.Map<Family>(createFamilyDto);
            _dbContext.Families.Add(family);
            _dbContext.SaveChanges();

            return family.Id;
        }
    }
}
