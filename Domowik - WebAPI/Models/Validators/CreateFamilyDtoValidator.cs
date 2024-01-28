using Domowik___WebAPI.Data;
using Domowik___WebAPI.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domowik___WebAPI.Models.Validators
{
    public class CreateFamilyDtoValidator:  AbstractValidator<CreateFamilyDto>
    {
        public CreateFamilyDtoValidator(DomowikDbContext dbContext, IUserContextService userContextService)
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(25);

            RuleFor(x => x)
                .MustAsync(async (dto, _) =>
                {
                    var userId = userContextService.GetUserId;
                    var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);

                    if (user?.FamilyId == null)
                    {
                        return true;
                    }
                    return false;
                });
        }
    }
}
